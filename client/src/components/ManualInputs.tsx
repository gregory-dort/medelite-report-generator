import React from 'react';

export interface ManualInputData {
    facilityNameOverride: string;
    emr: string;
    currentCensus: string;
    patientType: string;
    previousCoverage: 'Yes' | 'No' | '';
    previousPerformance: string;
    medicalCoverage: string;
}

interface ManualInputsProps {
    data: ManualInputData;
    onChange: (data: ManualInputData) => void;
}

const ManualInputs: React.FC<ManualInputsProps> = ({ data, onChange }) => {
    const handleChange = (field: keyof ManualInputData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Manual Inputs</h3>
            <div className="grid grid-cols-1 gap-4">

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Facility Name Override (optional)</label>
                    <input
                        type="text"
                        value={data.facilityNameOverride}
                        onChange={(e) => handleChange('facilityNameOverride', e.target.value)}
                        placeholder="Leave blank to use CMS name"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">EMR</label>
                    <input
                        type="text"
                        value={data.emr}
                        onChange={(e) => handleChange('emr', e.target.value)}
                        placeholder="e.g. PCC, MatrixCare"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Current Census</label>
                    <input
                        type="number"
                        value={data.currentCensus}
                        onChange={(e) => handleChange('currentCensus', e.target.value)}
                        placeholder="e.g. 112"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Type of Patient</label>
                <input
                    type="text"
                    value={data.patientType}
                    onChange={(e) => handleChange('patientType', e.target.value)}
                    placeholder="e.g. Long-term or Short-term"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Previous Coverage from Medelite</label>
                    <select
                        title="Previous Coverage from Medelite"
                        value={data.previousCoverage}
                        onChange={(e) => handleChange('previousCoverage', e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Previous Provider Performance from Medelite</label>
                    <input
                        type="text"
                        value={data.previousPerformance}
                        onChange={(e) => handleChange('previousPerformance', e.target.value)}
                        placeholder="e.g. About 30 patients/day"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Medical Coverage</label>
                    <input
                        type="text"
                        value={data.medicalCoverage}
                        onChange={(e) => handleChange('medicalCoverage', e.target.value)}
                        placeholder="e.g. Optometry, PCP, Podiatry"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
        </div>
    </div>
    );
};

export default ManualInputs;