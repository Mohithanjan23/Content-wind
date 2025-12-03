import React from 'react'

export default function KeywordsCard({ keywords, trendScore, relevance }){
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold">Keywords</h3>
      <div className="mt-2">{keywords.map(k=> <span key={k} className="inline-block mr-2 px-2 py-1 bg-slate-100 rounded">{k}</span>)}</div>
      <div className="mt-2 text-sm text-slate-500">Trend: {Math.round(trendScore)}</div>
      <div className="text-sm text-slate-500">Relevance: {relevance}</div>
    </div>
  )
}
