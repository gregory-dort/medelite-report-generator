import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const CMS_URL = '';
const DATASET_ID = '';

app.get('/api/facility/:ccn', async (req, res) => {
    const { ccn } = req.params;
})