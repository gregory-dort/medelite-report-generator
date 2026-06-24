import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import type { FacilityData } from '../App';

interface OccupancyChartProps {
    facilityData: FacilityData;
}

const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const value = payload[0]?.value;
            if (!value) return null;
            return (
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow text-sm">
                <p className="font-semibold">{value}% Occupancy Rate</p>
            </div>
            );
        }
        return null;
    };

const OccupancyChart: React.FC<OccupancyChartProps> = ({ facilityData }) => {
    const capacity = parseInt(facilityData.number_of_certified_beds) || 0;
    const current = parseFloat(facilityData.average_number_of_residents_per_day) || 0;
    const occupancyRate = capacity > 0 ? Math.round((current / capacity) * 100) : 0;

    const getColor = (rate: number) => {
        if (rate >= 90) return '#22c55e';
        if (rate >= 70) return '#f59e0b';
        return '#ef4444';
    };

    const getLabel = (rate: number) => {
        if (rate >= 90) return 'High Occupancy';
        if (rate >= 70) return 'Moderate Occupancy';
        return 'Low Occupancy';
    };

    const data = [
        { name: 'Occupancy', value: occupancyRate, fill: getColor(occupancyRate) },
    ];

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Occupancy Rate</h3>
            <div className="flex items-center justify-around">

                <ResponsiveContainer width="50%" height={250}>
                    <RadialBarChart
                        innerRadius="60%"
                        outerRadius="100%"
                        data={data}
                        startAngle={90}
                        endAngle={90 - (occupancyRate / 100) * 360}
                    >
                        <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#e5e7eb' }} />
                        <Tooltip content={<CustomTooltip />} />
                    </RadialBarChart>
                </ResponsiveContainer>

                <div className="flex flex-col gap-3 text-sm">
                    <div className="text-center">
                        <p className="text-4xl font-bold" style={{ color: getColor(occupancyRate) }}>
                        {occupancyRate}%
                        </p>
                        <p className="text-gray-500 mt-1">{getLabel(occupancyRate)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-2">
                        <div className="flex justify-between gap-6">
                        <span className="text-gray-500">Certified Beds</span>
                        <span className="font-semibold">{capacity}</span>
                        </div>
                        <div className="flex justify-between gap-6">
                        <span className="text-gray-500">Avg. Residents</span>
                        <span className="font-semibold">{current}</span>
                        </div>
                        <div className="flex justify-between gap-6">
                        <span className="text-gray-500">Available Beds</span>
                        <span className="font-semibold">{Math.round(capacity - current)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 justify-center mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"/> 90%+ High
                </span>
                <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"/> 70-89% Moderate
                </span>
                <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"/> Below 70% Low
                </span>
            </div>
        </div>
    )
}

export default OccupancyChart;