import { useState } from 'react'
import axios from 'axios';
import Header from './components/Header'
import SearchForm from './components/SearchForm';
import ManualInputs from './components/ManualInputs';
import type { ManualInputData } from './components/ManualInputs';
import ReportPreview from './components/ReportPreview';
import StarRatingsChart from './components/StarRatingsChart';
import OccupancyChart from './components/OccupancyChart';
import './App.css'

export interface FacilityData {
  cms_certification_number_ccn: string;
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

  const [manualData, setManualData] = useState<ManualInputData>({
    facilityNameOverride: '',
    emr: '',
    currentCensus: '',
    patientType: '',
    previousCoverage: '',
    previousPerformance: '',
    medicalCoverage: ''
  });

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Header state={facilityData?.state} />
        <div className="bg-white rounded-xl shadow-md p-8 mb-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Facility Assessment Report Generator
          </h1>
          <SearchForm onSearchSubmit={handleSearch} />
          {loading && (
            <p className="text-center text-gray-500 mt-4">Loading...</p>
          )}
          {error && (
            <p className="text-center text-red-500 mt-4">{error}</p>
          )}
        </div>

        {facilityData && (
          <p className="text-center text-green-600 font-medium mt-4 mb-2">
            ✓ Found: {facilityData.provider_name}
          </p>
        )}

        {facilityData && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <ManualInputs data={manualData} onChange={setManualData} />
          </div>
        )}

        {facilityData && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <StarRatingsChart facilityData={facilityData} />
            <OccupancyChart facilityData={facilityData} />
          </div>
        )}

        {facilityData && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <ReportPreview facilityData={facilityData} manualData={manualData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App
