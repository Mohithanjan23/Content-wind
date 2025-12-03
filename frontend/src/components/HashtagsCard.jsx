import React from 'react'

export default function HashtagsCard({ hashtags }){
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold">Hashtags</h3>
      <div className="mt-2">{hashtags.map(h => <span key={h} className="inline-block mr-2 px-2 py-1 bg-slate-100 rounded">{h}</span>)}</div>
    </div>
  )
}
