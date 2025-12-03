import React from 'react'

export default function ScoreCard({ result, onDownload }){
  const colorClass = result.color==='green' ? 'bg-green-100 text-green-700' : result.color==='yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
      <div>
        <div className="text-sm text-slate-500">Feasibility</div>
        <div className="text-2xl font-bold">{result.score}%</div>
        <div className="text-sm text-slate-500">{ result.color==='green' ? 'High potential' : result.color==='yellow' ? 'Needs optimization' : 'Low feasibility' }</div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onDownload} className="px-3 py-2 border rounded">Download</button>
      </div>
    </div>
  )
}
