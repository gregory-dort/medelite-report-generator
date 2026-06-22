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
            <h3>Manual Inputs</h3>

            <label>Facility Name Override (optional)</label>
            <input
                type="text"
                value={data.facilityNameOverride}
                onChange={(e) => handleChange('facilityNameOverride', e.target.value)}
                placeholder="Leave blank to use CMS name"
            />

            <label>EMR</label>
            <input
                type="text"
                value={data.emr}
                onChange={(e) => handleChange('emr', e.target.value)}
                placeholder="e.g. PCC, MatrixCare"
            />

            <label>Current Census</label>
            <input
                type="number"
                value={data.currentCensus}
                onChange={(e) => handleChange('currentCensus', e.target.value)}
                placeholder="e.g. 112"
            />

            <label>Type of Patient</label>
            <input
                type="text"
                value={data.patientType}
                onChange={(e) => handleChange('patientType', e.target.value)}
                placeholder="e.g. Long-term or Short-term"
            />

            <label>Previous Coverage from Medelite</label>
            <select
                title="Previous Coverage from Medelite"
                value={data.previousCoverage}
                onChange={(e) => handleChange('previousCoverage', e.target.value)}
            >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            <label>Previous Provider Performance from Medelite</label>
            <input
                type="text"
                value={data.previousPerformance}
                onChange={(e) => handleChange('previousPerformance', e.target.value)}
                placeholder="e.g. About 30 patients/day"
            />

            <label>Medical Coverage</label>
            <input
                type="text"
                value={data.medicalCoverage}
                onChange={(e) => handleChange('medicalCoverage', e.target.value)}
                placeholder="e.g. Optometry, PCP, Podiatry"
            />
        </div>
    );
};

export default ManualInputs;