import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import type { FacilityData } from '../App';

interface StarRatingsChartProps {
    facilityData: FacilityData;
};

const StarRatingsChart: React.FC<StarRatingsChartProps> = ({ facilityData }) => {
    const data = [
    { name: 'Overall', value: parseInt(facilityData.overall_rating) || 0 },
    { name: 'Health Inspection', value: parseInt(facilityData.health_inspection_rating) || 0 },
    { name: 'Staffing', value: parseInt(facilityData.staffing_rating) || 0 },
    { name: 'Quality of Care', value: parseInt(facilityData.qm_rating) || 0 },
  ];

  const getColor = (value: number) => {
    if (value >= 4) return '#22c55e';
    if (value === 3) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Star Ratings Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip
            formatter={(value) => [`${value} / 5 stars`, 'Rating']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 justify-center mt-2 text-sm text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"/> 4-5 stars</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"/> 3 stars</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"/> 1-2 stars</span>
      </div>
    </div>
  );
};

export default StarRatingsChart;
