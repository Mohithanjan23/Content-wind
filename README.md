# Content Wind 🌪️

A premium, real-world **Content Feasibility Analyzer** that evaluates content pitches (like videos, articles, or tutorials) and determines their potential success across different platforms like Instagram and LinkedIn.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📌 Features

- **Premium UI/UX:** Built with React, Vite, and TailwindCSS for a sleek, glassmorphism-inspired design.
- **Smooth Animations:** Integrated with `framer-motion` for fluid micro-animations and page transitions.
- **Data Visualization:** Utilizes `recharts` to render beautiful, dynamic charts for your content scores.
- **Robust Backend Logic:** Powered by Express.js to process content semantics, calculate trend metrics, and analyze keyword relevance. 
- **Persisted History:** SQLite integrated using `better-sqlite3` to securely store and retrieve past analyses without relying on a bulky database setup.
- **Platform-Specific Insights:** Get actionable advice, estimated reach, and hashtags tailored for platforms like Instagram and LinkedIn.

## 🚀 Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS** (Styling & Design System)
- **Framer Motion** (Animations)
- **Recharts** (Data Visualization)
- **Lucide React** (Icons)
- **clsx** & **tailwind-merge** (Utility classes)

### Backend
- **Node.js** & **Express**
- **better-sqlite3** (Database Persistence)
- **dotenv** (Environment Configuration)
- **CORS** 

## 🛠️ Installation & Setup

Ensure you have Node.js (v18+) installed. This repository is split into two directories: `frontend` and `backend`.

### 1. Clone the repository
```bash
git clone https://github.com/Mohithanjan23/Content-wind.git
cd Content-wind
```

### 2. Backend Setup
Navigate to the `backend` directory, install dependencies, and start the server:
```bash
cd backend
npm install
npm start
```
The backend will initialize an embedded `app.db` SQLite database automatically and run on `http://localhost:3001`.

### 3. Frontend Setup
Open a new terminal tab, navigate to the `frontend` directory, install dependencies, and start the dev server:
```bash
cd frontend
npm install
npm run dev
```
The frontend will be accessible at `http://localhost:5173`.

## 📂 Project Structure

```text
Content-wind/
├── backend/
│   ├── analyzers/      # Core AI/Scoring business logic (keywords, platforms, score)
│   ├── db/             # SQLite connection initialization
│   ├── routes/         # Express endpoint modules (/api/analyze, /api/history)
│   ├── index.js        # Express app entry point
│   └── package.json    # Backend dependencies
└── frontend/
    ├── src/
    │   ├── components/ui/ # Reusable React components (Button, Card, metrics)
    │   ├── pages/         # React routes (Home, Analyzer, Report, History, About)
    │   ├── utils/         # Frontend utilities & analysis mocking
    │   ├── App.jsx        # App router & layout
    │   └── index.css      # Core Tailwind & custom aesthetic styles
    ├── tailwind.config.cjs
    └── package.json       # Frontend dependencies
```

## 🎮 Usage 

1. **Analyze:** Go to `http://localhost:5173/analyze` and enter an elevator pitch for your content idea (e.g., "Learn Next.js by building a complex interactive game").
2. **Select Platforms:** Choose the target platforms (Instagram, LinkedIn).
3. **Generate Report:** View your detailed feasibility score, platform fitness breakdowns, trend signals, and suggested hooks/hashtags.
4. **History:** Navigate to `/history` to review past content analyses securely saved to the backend.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/Mohithanjan23/Content-wind/issues). 
