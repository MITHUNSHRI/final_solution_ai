# Project Documentation: final_solution_ai

## 1. Project Overview
This project is an **AI-Powered Sales Intelligence Platform**. It manages leads, predicts sales success using "AI Match Scores," and facilitates outbound campaigns.

## 2. Tech Stack
- **Frontend**: React (v19) with Vite (v7).
- **Styling**: Tailwind-like CSS with Lucide React for iconography.
- **Backend**: Node.js with Express.
- **Database**: SQLite (using `better-sqlite3`) for persistent lead storage.
- **Email**: Nodemailer for sending outbound sales emails.

## 3. Key Features
- **Dashboard**: Real-time overview of sales performance.
- **Customer & Lead Management**: CRUD (Create, Read, Update, Delete) operations for leads stored in the SQLite database.
- **AI Match Scoring**: Automatic calculation of lead relevance (mocked logic).
- **Campaigns**: Personalized email outreach.
- **Data Ingestion**: Tools to import leads from various sources.

## 4. Architecture & Data Flow

### Database Schema (`server/database.js`)
The database contains a `customers` table with:
- `id`, `name`, `email`, `company`, `role`, `industry`
- `matchScore` (percentage)
- `createdAt`, `updatedAt`

### API Endpoints (`server/routes/leads.js`)
- `GET /api/customers`: Fetches all leads.
- `GET /api/customers/:id`: Fetches a single lead.
- `POST /api/customers`: Adds a new lead.
- `PUT /api/customers/:id`: Updates lead details.
- `DELETE /api/customers/:id`: Removes a lead.

### Connection Logic
- **Vite Proxy**: Configured in `vite.config.js` to forward `/api` requests to `http://127.0.0.1:3000`.
- **Backend Host**: Configured to listen on `0.0.0.0` (all interfaces) for better Windows compatibility.

## 5. Setup & Running Instructions

### Local Development
1. **Install Dependencies**:
   ```bash
   npm install
   cd server && npm install
   ```
2. **Start the Backend**:
   ```bash
   npm run server
   ```
3. **Start the Frontend** (in a new terminal):
   ```bash
   npm run dev
   ```

## 6. Recent Improvements
- **Project Consolidation**: Unified the project under the original name **final_solution_ai**.
- **Database Connection Fix**: Resolved the "Connection Refused" error by switching proxy to `127.0.0.1` and ensuring the backend server script was accessible via `npm run server`.
- **Automation**: Added convenience scripts to the root `package.json` for easier workflow.

## 7. Future Deployment
- **Recommended Hosts**: Render or Railway.
- **Requirements**: Supports Node.js and persistent storage (Volumes) for the `.db` file.
