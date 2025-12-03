import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Report from './pages/Report'
import About from './pages/About'
import NotFound from './pages/NotFound'

function Header(){
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="font-semibold text-lg text-primary">CONTENT WIND</Link>
        <nav className="flex gap-4 ml-4">
          <Link to="/analyze" className="text-sm text-slate-600 hover:text-primary">Analyzer</Link>
          <Link to="/report" className="text-sm text-slate-600 hover:text-primary">Report</Link>
          <Link to="/about" className="text-sm text-slate-600 hover:text-primary">About</Link>
        </nav>
        <div className="ml-auto">
          <a href="#" className="text-sm px-3 py-1 rounded bg-gradient-to-r from-primary to-accent text-white">Try Demo</a>
        </div>
      </div>
    </header>
  )
}

export default function App(){
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/analyze" element={<Analyzer/>} />
            <Route path="/report" element={<Report/>} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </main>
        <footer className="text-center text-xs py-6 text-slate-500">
  © {new Date().getFullYear()} Content Wind — 
  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
    Built by Mohith Anjan
  </span>
</footer>
      </div>
    </Router>
  )
}
