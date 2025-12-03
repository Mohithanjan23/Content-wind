import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Report(){
  const location = useLocation()
  const report = location.state?.report || null

  if(!report){
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-xl font-semibold">No report loaded</h2>
        <p className="mt-3 text-slate-600">Run an analysis on the Analyzer page to view a report here.</p>
        <div className="mt-6"><Link to="/analyze" className="text-primary underline">Go to Analyzer</Link></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Analysis Report</h1>
      <pre className="p-4 bg-slate-50 rounded text-sm overflow-auto">{JSON.stringify(report, null, 2)}</pre>
    </div>
  )
}
