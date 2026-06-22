import { useState } from 'react'
import axios from 'axios';
import SearchForm from './components/SearchForm';
import './App.css'

export interface FacilityData {
  cms_certification_number_cnn: string;
  provider_name: string;
  location: string;
  state: string;
  number_of_certified_beds: string;
  average_number_of_residents_per_day: string;
  overall_rating: string;
  health_inspection_rating: string;
  staffing_rating: string;
  qm_rating: string;
}

function App() {
  const [facilityData, setFacilityData] = useState<FacilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (ccn: string) => {
    setLoading(true);
    setError(null);
    setFacilityData(null);

    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/facility/${ccn}`);
      setFacilityData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError('Facility not found. Please check CCN and try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSearchSubmit={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {facilityData && <p>Found: {facilityData.provider_name}</p>}
    </div>
  );
}

export default App
