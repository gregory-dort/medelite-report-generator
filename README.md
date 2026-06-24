# _Report Generator Github Repository_

### **Medelite Report Generator Web App**

- Description:

* This application takes a dynamic CCN (CMS Certification Number), queries the public CMS Provider Data Catalog API and returns the data retrieved.

* The data is shown in both a PDF / Word Document Preview for download and Curated Graphs that display Facility Ratings.

- Purpose

* This projest was built to showcase my data retrieval skills from external sources and displaying the results for user access.

- Knowledge Gained

*

### **Live Demo**

- Vercel (Frontend) Link: *https://medelite-report-generator-nu.vercel.app*
- Render (Backend) Link: *https://medelite-report-generator-gkan.onrender.com*

### **Tech Stack**

- Frontend (TypeScript / React)
- Backend (TypeScript / Node / Express)
- Key Libraries:
  - Frontend
    - Recharts: Created ratings bar charts utilizing the recharts library
    - HTML2PDF: Utilized this library to efficiently transform HTML Elements into a formatted PDF document available for download.
    - Docx / File-saver: Utilized these libraries to create word document format for download.
    - Axios: Utilized this library to allow connection to the CMS API properly through the express proxy server.
    - TailwindCSS: Utilized this library to style main web application components including: section backgrounds, text styling, text input fields, download buttons and error / success message appearance.

  - Backend
    - Axios: Utilized this library to allow connection to the CMS API properly through the express proxy server.
    - Express: Utilized Express to create a proxy server that handles requests from the web application to the CMS API.
    - CORS: Utilized this library to specify cors policies and allow connection between frontend and backend once both sections of the application were deployed.

### **Features**

- Minimal Viable Product (MVP) Features
- Bonus Features

---

### **Getting Started (Local Machine Setup)**

-

### **Environment Variables**

-

### **API Reference**

-

### **Assumptions & Engineering Decisions**

-
