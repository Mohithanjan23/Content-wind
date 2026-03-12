import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { DownloadCloud, ArrowLeft, BarChart2, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { downloadJSON } from '../utils/download'

export default function Report(){
  const location = useLocation()
  const report = location.state?.report || null

  if(!report){
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <BarChart2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">No report available</h2>
        <p className="mt-2 text-slate-500 max-w-md">Run an analysis on the Analyzer page to view a beautiful visualization of your content's potential here.</p>
        <Link to="/analyze" className="mt-6">
          <Button variant="default">Go to Analyzer</Button>
        </Link>
      </div>
    )
  }

  // Prep chart data
  const chartData = Object.entries(report.platformScores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value
  }))

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/analyze" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Analyzer
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analysis Snapshot</h1>
        </div>
        <Button onClick={() => downloadJSON('cfa_report.json', report)} variant="outline" className="gap-2">
          <DownloadCloud className="w-4 h-4" /> Download JSON
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Score Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1">
          <Card className="h-full bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700">Overall Feasibility</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-6 pb-10">
              <div className="relative">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * report.feasibilityScore) / 100}
                    className="text-primary transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold text-slate-800">{report.feasibilityScore}</span>
                  <span className="text-xs text-slate-500 font-medium">/ 100</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Platform Breakdown Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Platform Suitability</CardTitle>
              <CardDescription>How well your pitch fits each selected platform</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{fill: '#F1F5F9'}} 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                  />
                  <Bar dataKey="score" fill="currentColor" className="fill-primary" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Topics & Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Keywords Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {report.keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                    {kw}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Actionable Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report.suggestions.map((sug, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
