import React from 'react'

export default function PitchInput({ pitch, setPitch }){
  return (
    <div className="mt-4">
      <label className="text-sm font-medium text-slate-700">Elevator pitch</label>
      <textarea value={pitch} onChange={e=>setPitch(e.target.value)}
        className="w-full mt-2 p-3 border rounded-lg bg-slate-50" rows={3} />
    </div>
  )
}
