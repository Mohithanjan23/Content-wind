import React, { useState } from 'react'
import PitchInput from '../components/PitchInput'
import PlatformSelector from '../components/PlatformSelector'
import ReportSection from '../components/ReportSection'
import { analyzePitch } from '../utils/analysis'
import { validatePitch, validatePlatforms } from '../utils/validators'
import { downloadJSON } from '../utils/download'

export default function Analyzer(){
  const [pitch, setPitch] = useState('Compare React vs Angular using a cooking analogy.')
  const [platforms, setPlatforms] = useState({ instagram: true, linkedin: true })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  function togglePlatform(p){ setPlatforms(s => ({ ...s, [p]: !s[p] })) }

  async function onAnalyze(){
    setError(null)
    const v1 = validatePitch(pitch)
    if(!v1.valid){ setError(v1.message); return }
    const v2 = validatePlatforms(platforms)
    if(!v2.valid){ setError(v2.message); return }

    setLoading(true)
    // local analysis (fast)
    const selected = Object.entries(platforms).filter(([_,v])=>v).map(([k])=>k)
    const report = analyzePitch(pitch, selected)
    await new Promise(r => setTimeout(r, 300)) // small UX delay
    setResult(report)
    setLoading(false)
  }

  function onDownload(){
    if(!result) return
    downloadJSON('cfa_report.json', result)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold">Analyze your idea</h2>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        <PitchInput pitch={pitch} setPitch={setPitch} />
        <PlatformSelector platforms={platforms} togglePlatform={togglePlatform} onAnalyze={onAnalyze} loading={loading} />
        {result && <div className="mt-4 flex justify-end"><button onClick={onDownload} className="px-3 py-2 border rounded text-sm">Download JSON</button></div>}
        <ReportSection result={result} onDownload={onDownload} />
      </div>
    </div>
  )
}
