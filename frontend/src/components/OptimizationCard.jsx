import React from 'react'

export default function OptimizationCard({ hook, retention, scriptStarter }){
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold">Optimization</h3>
      <p className="mt-2">Hook: {hook}</p>
      <p className="mt-2">Retention: {retention}</p>
      <p className="mt-2 text-sm"><em>{scriptStarter}</em></p>
    </div>
  )
}
