import React from 'react'

export default function PlatformSelector({ platforms, togglePlatform, onAnalyze, loading }){
  return (
    <div className="mt-4 flex items-center gap-4">
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={platforms.instagram} onChange={()=>togglePlatform('instagram')} />
        <span className="text-sm">Instagram</span>
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={platforms.linkedin} onChange={()=>togglePlatform('linkedin')} />
        <span className="text-sm">LinkedIn</span>
      </label>

      <div className="ml-auto">
        <button onClick={onAnalyze} disabled={loading} className="px-4 py-2 rounded bg-gradient-to-r from-primary to-accent text-white">
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </div>
  )
}
