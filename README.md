# 🌬️ Content Wind — Content Feasibility Analyzer  
A smart, fast, and creator-friendly tool that helps validate content ideas before you film or produce them.  
It analyzes **trend strength**, **platform fit**, **keywords**, **hooks**, **retention tactics**, **hashtags**, and provides a full **feasibility score**.

Built with ❤️ by **Mohith Anjan**  
Frontend: React + Vite + Tailwind  
Backend: Node.js (Express)

---

## 🚀 Features

### 🔎 Idea Analyzer
- Extracts keywords from your content idea
- Runs trend-based scoring (mock or backend-driven)
- Computes platform fit for Instagram & LinkedIn
- Generates:
  - Feasibility Score
  - Hooks
  - Retention Tactics
  - Script Starter
  - Hashtags
  - Platform Breakdown
  - Competitor Check

### 🎨 Beautiful UI
- Tailwind-powered ultra-clean design  
- Gradient highlights and soft animations  
- Fully responsive on mobile, tablet, and desktop  

### ⚡ Fast Frontend Experience
- Built with Vite for instant loading  
- React Router for navigation  
- Local analysis or backend-based scoring  

### 🧠 Optional Backend (Node.js)
- Analyze pitches server-side  
- Extendable with real APIs (HuggingFace, Google Trends, YouTube stats)  
- Clean Express architecture with analyzers/

## 📂 Project Structure
├── frontend/
│ ├── src/
│ │ ├── pages/ # Home, Analyzer, Report, About
│ │ ├── components/ # UI blocks & cards
│ │ ├── utils/ # analysis logic, download, formatting
│ │ ├── App.jsx # App router
│ │ ├── main.jsx # React entry
│ │ └── index.css # Tailwind
│ ├── index.html
│ ├── vite.config.js
│ └── package.json
│
└── backend/
├── analyzers/ # analysis engine
├── index.js # express server
└── package.json

## Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev

Frontend will start at:
👉 http://localhost:5173/

## Backend Setup (Node.js + Express)
cd backend
npm install
node index.js

Backend runs on:
👉 http://localhost:3001/

# Frontend
npm run build
# Preview
npm run preview
