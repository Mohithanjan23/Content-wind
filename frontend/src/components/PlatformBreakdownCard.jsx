import React from 'react'

export default function PlatformBreakdownCard({ platforms }){
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold">Platform Breakdown</h3>
      <div className="mt-3 grid md:grid-cols-2 gap-3">
        {Object.entries(platforms).map(([p, data]) => (
          <div key={p} className="border p-3 rounded">
            <div className="font-medium capitalize">{p}</div>
            <div className="text-sm text-slate-600 mt-1">Verdict: {data.verdict}</div>
            <div className="text-sm text-slate-600">Tone: {data.tone}</div>
            <div className="text-sm text-slate-600">Est reach: {data.estReach}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
