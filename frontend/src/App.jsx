import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Wind } from 'lucide-react'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Report from './pages/Report'
import History from './pages/History'
import About from './pages/About'
import NotFound from './pages/NotFound'

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600'}`}
    >
      {children}
    </Link>
  );
}

function Header(){
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="font-bold text-xl text-slate-900 flex items-center gap-2 group">
          <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Wind className="w-5 h-5 text-primary" />
          </div>
          Content <span className="text-primary">Wind</span>
        </Link>
        <nav className="hidden md:flex gap-6 ml-8">
          <NavLink to="/analyze">Analyzer</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="ml-auto hidden sm:block">
          <Link to="/analyze" className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all hover:opacity-90">
            Start Analyzing
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function App(){
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/analyze" element={<Analyzer/>} />
            <Route path="/report" element={<Report/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </main>
        <footer className="bg-white border-t py-8 text-center text-sm text-slate-500">
          <div className="max-w-6xl mx-auto px-6">
            <p className="flex items-center justify-center gap-1">
              © {new Date().getFullYear()} Content Wind. Built for modern creators.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}
