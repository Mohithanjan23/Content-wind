import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900">Validate content ideas instantly — stop guessing, start strategizing.</h1>
          <p className="mt-4 text-slate-600 max-w-xl">The Content Feasibility Analyzer helps creators check platform fit, trend strength, hooks, and script starters — in seconds.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/analyze" className="px-5 py-3 rounded bg-gradient-to-r from-primary to-accent text-white shadow-lg">Analyze idea</Link>
            <Link to="/about" className="px-5 py-3 rounded border text-slate-700">Learn more</Link>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-primary to-accent animate-float" />
            <div>
              <div className="text-sm font-semibold">Quick demo</div>
              <div className="text-xs text-slate-500">Type an idea, pick platforms, and get a feasibility report</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs text-slate-500">Example idea</div>
            <div className="mt-2 p-3 bg-slate-50 rounded">Compare React vs Angular using a cooking analogy — for Instagram Reels</div>
            <div className="mt-4">
              <Link to="/analyze" className="text-sm text-primary underline">Run analysis</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
