# _Report Generator Github Repository_

## **Medelite Report Generator Web App**

### _Description_

- This application takes a dynamic CCN (CMS Certification Number), queries the public CMS Provider Data Catalog API and returns the data retrieved.

- The data is shown in both a PDF / Word Document Preview for download and Curated Graphs that display Facility Ratings.

### _Purpose_

- This projest was built to showcase my data retrieval skills from external sources and display the results for user interpretation and access.

- Additionally I utilized the opportunity to understand the development of API technology on a deeper level.

### _Knowledge Gained_

- System Design based on System Requirements
- API Development
- Full-Stack Engineering Workflow
- PDF / Document Reconstructure

## **Live Demo**

Vercel (Frontend) Link: *https://medelite-report-generator-nu.vercel.app*
Render (Backend) Link: *https://medelite-report-generator-gkan.onrender.com*

## **Tech Stack**

### Frontend (TypeScript / React)

### Backend (TypeScript / Node / Express)

### Key Libraries:

_Frontend_ Recharts: Created ratings bar charts utilizing the recharts library.

    * HTML2PDF: Utilized this library to efficiently transform HTML Elements into a formatted PDF document available for download.

    * Docx / File-saver: Utilized these libraries to create word document format for download.

    * Axios: Utilized this library to allow connection to the CMS API properly through the express proxy server.

    * TailwindCSS: Utilized this library to style main web application components including: section backgrounds, text styling, text input fields, download buttons and error / success message appearance.

_Backend_ Axios: Utilized this library to allow connection to the CMS API properly through the express proxy server.

    * Express: Utilized Express to create a proxy server that handles requests from the web application to the CMS API.

    * CORS: Utilized this library to specify cors policies and allow connection between frontend and backend once both sections of the application were deployed.

## **Features**

### Minimal Viable Product (MVP) Features

- Dynamic CCN Lookup: User can enter a valid CCN to fetch data for a nursing / health facility

- Data Engine: When CCN is entered, it queries a public catalog to fetch facility location, star ratings & metadata

- Facility Name Override: Official Legal Name for facilities can be overwritten with manual input as an optional feature for report generation

- Manual Operational Inputs: Additional manual input fields for information related to Medelite's internal metrics which aren't available on public database

- Polished PDF Preview & Export: Preview of PDF prior to generating along with a button to download the given report as a PDF

- Medicare Source Hyperlink: A hperlink to facility data on the Medicare government website is availble in both the PDF Preview and PDF document

### Bonus Features

- Complex Chart Display: Charts displaying facility occupancy rate and star ratings when facility data is fetched

- Word Document Format & Export: Word Document Export which is structured the same way as the PDF Export with a button allowing download of docx. file

---

## **Environment Variables**

### Client Folder .Env

- Variable should be named VITE_API_URL
- Set this variable's value to the localhost backend folder server connection link

### Backend Folder .Env

- Variable should be named CLIENT_URL
- Set this variable's value to the localhost client folder server connection link

## **Getting Started (Local Machine Setup)**

### Pre-requisites

- IDE installed on machine that allows TypeScript use (Visual Studio Code, etc)

1. Clone Github Repository
2. Install dependencies for Client folder using 'npm install'
3. Install dependencies for Backend folder using 'npm install'

Once all dependencies are installed with no errors present:

1. Create a .env file at the root of the Client folder
2. Create another .env file at the root of the Backend Folder
3. Create Environment Variables for each file as mentioned in Environment Variables Section

### How to Run Each Server

Client Server:

1. Make sure in your terminal your file path is pointing to the client folder
   - Mac Example: machine@Mac client
   - Windows Example: C:\Users\YourName\Projects\report-generator\client
2. Use the command: npm run dev to start the server
3. In your terminal click the link for localhost://5173 or copy-paste the link into a web browser
4. You should see the search input bar on your screen at this point... Meaning you've connected!

Backend Server:

1. Make sure in your terminal your file path is pointing to the backend folder
   - Mac Example: machine@Mac backend
   - Windows Example: C:\Users\YourName\Projects\report-generator\backend
2. Use the command: npm run dev to start the server
3. In your terminal you should see a message that the server is running on a port... Which means you've connected!

## **API Reference**

### External CMS Dataset

- Dataset ID: 4pq5-n9py
  - This dataset provides facility name, fcaility location, facility star ratings & bed count

- CMS Base Url: https://data.cms.gov/provider-data/api/1/datastore/query
  - This url allows connection to the CMS Dataset which holds all public facility data

### Express Endpoint

- GET /api/facility/:ccn
  - This endpoint fetches data from the CMD Dataset based on CCN

### Example Query

- GET /api/facility/686123
  - This fetches data for the Kendall Lakes Facility from the CMS Dataset

## **Assumptions & Engineering Decisions**

- With no access to Medelite Official Banner, I recreated the text and made a designated space for the web app header and generated report header to hold the recreated text.

- I decided to go with the approach of utilizing hTML Elements to recreate the exaple PDF / Word Document because of my familiarity with CSS. The disadvantage of this approach is the generated output may be blurry depending on zoom level as it is not a vector text document.
  - I made this decision to ensure I made the project deadline, in the future utilizing a library such as pdfmake would ensure better document generation and prevent blurriness at certain zoom levels.
  - The tradeoff for this decision is the ability to visually see document updates while editing. This allowed me to get the generation right without having to download the file many times to see the output of the report tables.

- I chose a Client-Server Architecture approach here as the requirements for the applications didn't seem to have the use for a database since the data is being pulled from a public API. This architecture allowed for a simple connection between the frontend and backend express proxy server.
