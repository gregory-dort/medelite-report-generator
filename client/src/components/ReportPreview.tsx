import React, { useRef } from 'react';
import type { FacilityData } from '../App';
import type { ManualInputData } from './ManualInputs';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

interface ReportPreviewProps {
    facilityData: FacilityData;
    manualData: ManualInputData;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ facilityData, manualData }) => {
    console.log('facilityData:', facilityData);
    console.log('manualData:', manualData);
    const reportRef = useRef<HTMLDivElement>(null);

    const facilityName = manualData.facilityNameOverride || facilityData.provider_name;

    const handleDownloadPdf = async () => {
        const html2pdf = (await import('html2pdf.js')).default;
        const element = reportRef.current;
        if (!element) return;

        const options = {
            margin: 0.5,
            filename: `${facilityName}_Assessment.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const },
        };
        html2pdf().set(options).from(element).save();
    };

    const handleDownloadDocx = async () => {
        const createRow = (label: string, value: string) => new TableRow({
          children: [
            new TableCell({
                width: { size: 4500, type: WidthType.DXA },
                children: [new Paragraph({
                    children: [new TextRun({ text: label, bold: true })],
                })],
            }),
            new TableCell({
                width: { size: 4500, type: WidthType.DXA },
                children: [new Paragraph({ text: value })],
            }),
          ], 
        });

        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({
                            text: 'INFINITE - Managed by MEDELITE',
                            bold: true,
                            size: 32,
                        })]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({
                            text: 'FACILITY ASSESSMENT SNAPSHOT',
                            bold: true,
                            size: 24,
                        })]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({
                            text: facilityData.state,
                            bold: true,
                            size: 24,
                        })]
                    }),
                    new Paragraph({ text: '' }),
                    new Table({
                        width: { size: 9000, type: WidthType.DXA },
                        rows: [
                            createRow('Name of Facility', facilityName),
                            createRow('Location', facilityData.location),
                            createRow('EMR', manualData.emr),
                            createRow('Census Capacity', facilityData.number_of_certified_beds),
                            createRow('Current Census', manualData.currentCensus),
                            createRow('Type of Patient', manualData.patientType),
                            createRow('Previous Coverage from Medelite', manualData.previousCoverage),
                            createRow('Previous Provider Performance from Medelite', manualData.previousPerformance),
                            createRow('Medical Coverage', manualData.medicalCoverage),
                            createRow('Overall Star Rating', facilityData.overall_rating + ' / 5'),
                            createRow('Health Inspection', facilityData.health_inspection_rating + ' / 5'),
                            createRow('Staffing', facilityData.staffing_rating + ' / 5'),
                            createRow('Quality of Resident Care', facilityData.qm_rating + ' / 5'),
                            createRow('Medicare Source', `https://www.medicare.gov/care-compare/details/nursing-home/${facilityData.cms_certification_number_ccn}`),
                        ],
                    }),
                ],
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${facilityName}_Assessment.docx`);
    }

    const renderStars = (rating: string) => {
        const num = parseInt(rating);
        if (isNaN(num)) return 'N/A';
        return '★'.repeat(num) + '☆'.repeat(5 - num);
    };

    return (
        <div>
            <div className="bg-gray-200 shadow-sm p-4 mb-2">
                <div ref={reportRef} style={{
                    fontFamily: 'Arial, sans-serif',
                    padding: '20px',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            INFINITE - Managed by MEDELITE
                        </h1>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            FACILITY ASSESSMENT SNAPSHOT
                        </h2>
                        <h3>{facilityData.state}</h3>
                    </div>

                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '14px',
                    }}>
                        <tbody>
                            <tr>
                                <td style={labelCell}>Name of Facility</td>
                                <td style={valueCell}>{facilityName}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Location</td>
                                <td style={valueCell}>{facilityData.location}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>EMR</td>
                                <td style={valueCell}>{manualData.emr}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Census Capacity</td>
                                <td style={valueCell}>{facilityData.number_of_certified_beds}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Current Census</td>
                                <td style={valueCell}>{manualData.currentCensus}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Type of Patient</td>
                                <td style={valueCell}>{manualData.patientType}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Previous Coverage from Medelite</td>
                                <td style={valueCell}>{manualData.previousCoverage}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Previous Provider Performance from Medelite</td>
                                <td style={valueCell}>{manualData.previousPerformance}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Medical Coverage</td>
                                <td style={valueCell}>{manualData.medicalCoverage}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Overall Star Rating</td>
                                <td style={valueCell}>{renderStars(facilityData.overall_rating)}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Health Inspection</td>
                                <td style={valueCell}>{renderStars(facilityData.health_inspection_rating)}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Staffing</td>
                                <td style={valueCell}>{renderStars(facilityData.staffing_rating)}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Quality of Resident Care</td>
                                <td style={valueCell}>{renderStars(facilityData.qm_rating)}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Medicare Source</td>
                                <td style={valueCell}>
                                    <a
                                        href={`https://www.medicare.gov/care-compare/details/nursing-home/${facilityData.cms_certification_number_ccn}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#1a56db', textDecoration: 'underline' }}
                                    >
                                        View on Medicare Care Compare
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center gap-2 mb-2 px-4 py-4">
                <button 
                onClick={handleDownloadPdf}
                className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
                >
                    Download PDF
                </button>
                <button
                    onClick={handleDownloadDocx}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Download Word Doc
                </button>
            </div>
        </div>
    );
};

const labelCell: React.CSSProperties = {
    fontWeight: 'bold',
    padding: '10px 16 px',
    paddingLeft: '16px',
    border: '1px solid #000',
    width: '45%',
    verticalAlign: 'middle',
    lineHeight: '1.5',
    wordBreak: 'break-word',
};

const valueCell: React.CSSProperties = {
    padding: '10px 16px',
    border: '1px solid #000',
    width: '55%',
    verticalAlign: 'middle',
    lineHeight: '1.5',
    wordBreak: 'break-word',
};

export default ReportPreview;