import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const CMS_URL = 'https://data.cms.gov/provider-data/api/1/datastore/query';
const DATASET_ID = '4pq5-n9py';

app.get('/api/facility/:ccn', async (req, res) => {
    const { ccn } = req.params;

    try {
        const response = await axios.get(`${CMS_URL}/${DATASET_ID}/0`, {
            params: {
                'conditions[0][property]': 'cms_certification_number_ccn',
                'conditions[0][value]': ccn,
                'conditions[0][operator]': '=',
                limit: 1,
            },
        });

        const results = response.data.results;
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        res.json(results[0]);
    } catch (error) {
        console.error('CMS API Error: ', error);
        res.status(500).json({ error: 'Failed to fetch facility data' });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});