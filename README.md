# AI-Powered Sales Intelligence Platform

A comprehensive sales management and lead prediction platform built with a modern full-stack architecture. This project manages leads, calculates "AI Match Scores" for potential customers, and facilitates outbound sales campaigns through automated email outreach.

## 🚀 Quick Start

To get the project running on your local machine, follow these steps:

### 1. Install Dependencies
You need to install dependencies for both the frontend and the backend.

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
cd ..
```

### 2. Configure Environment
Create a `.env` file in the `backend` directory (if it doesn't already exist) with necessary configuration like email credentials for Nodemailer.

### 3. Run the Application
You can start both the backend and frontend using the following commands:

**Start the Backend Server:**
```bash
npm run server
```

**Start the Frontend Development Server:**
In a new terminal window:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port specified by Vite).

---

## 🛠 Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS with modern design principles (Glassmorphism, Responsive Layouts).

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [SQLite](https://sqlite.org/) (via `better-sqlite3`) for persistent storage.
- **Email Service**: [Nodemailer](https://nodemailer.com/) for sales outreach.
- **Utilities**: `cors`, `body-parser`, `dotenv`.

---

## 📂 Project Structure

- `frontend/`: React application code, components, and assets.
- `backend/`: Express server, database configuration, and API routes.
- `backend/aura_sales.db`: SQLite database file for local data persistence.

---

## ✨ Key Features

- **Sales Dashboard**: Real-time overview of sales metrics and performance.
- **Lead Management**: Full CRUD operations for customer and lead data.
- **AI Match Scoring**: Proprietary (mocked) logic to identify high-value leads.
- **Campaign Outreach**: Sending personalized emails to leads directly from the platform.
- **Responsive Design**: Optimized for desktop and tablets.
![alt text](<Screenshot 2026-03-03 223314.png>)