import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Wand2, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import PitchInput from '../components/PitchInput'
import PlatformSelector from '../components/PlatformSelector'
import { validatePitch, validatePlatforms } from '../utils/validators'

export default function Analyzer(){
  const [pitch, setPitch] = useState('Compare React vs Angular using a cooking analogy.')
  const [platforms, setPlatforms] = useState({ instagram: true, linkedin: true })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  function togglePlatform(p){ setPlatforms(s => ({ ...s, [p]: !s[p] })) }

  async function onAnalyze(){
    setError(null)
    const v1 = validatePitch(pitch)
    if(!v1.valid){ setError(v1.message); return }
    const v2 = validatePlatforms(platforms)
    if(!v2.valid){ setError(v2.message); return }

    setLoading(true)
    const selected = Object.entries(platforms).filter(([_,v])=>v).map(([k])=>k)
    
    try {
      // API call to the new backend
      const res = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch, platforms: selected })
      });
      
      if (!res.ok) throw new Error("Failed to analyze pitch.");
      
      const report = await res.json();
      setLoading(false);
      
      // Navigate to beautiful report page
      navigate('/report', { state: { report } });
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing the pitch.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="glass overflow-hidden relative">
          {/* Decorative gradient orb */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              Analyze your idea
            </CardTitle>
            <CardDescription>Enter a content pitch and select platforms to see its feasibility.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}
            
            <PitchInput pitch={pitch} setPitch={setPitch} />
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Target Platforms</label>
              <PlatformSelector platforms={platforms} togglePlatform={togglePlatform} />
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={onAnalyze} disabled={loading} size="lg" className="w-full sm:w-auto gap-2">
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                ) : (
                  <>Generate Report <ArrowRight className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
