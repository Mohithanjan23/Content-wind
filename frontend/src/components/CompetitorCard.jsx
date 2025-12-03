import React from 'react'

export default function CompetitorCard({ competitors }){
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold">Competitors</h3>
      <div className="mt-2">{competitors.length ? competitors.map(c => <div key={c.name} className="text-sm">{c.name} — {c.topic} — {c.views}</div>) : <div className="text-sm text-slate-500">No similar creators</div>}</div>
    </div>
  )
}
