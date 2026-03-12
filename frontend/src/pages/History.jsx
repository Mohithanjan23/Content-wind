import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, History as HistoryIcon, ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function History(){
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch('http://localhost:3001/api/history')
        if (!res.ok) throw new Error("Failed to fetch history")
        const data = await res.json()
        setHistory(data)
      } catch(err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <HistoryIcon className="w-8 h-8 text-primary" />
          Analysis History
        </h1>
        <p className="text-slate-500 mt-2">Access your previously analyzed content pitches.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
      ) : history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No history yet</h3>
          <p className="text-slate-500 mt-1">Start by analyzing your first pitch.</p>
          <Link to="/analyze" className="mt-4 inline-block">
            <Button>Analyze Pitch</Button>
          </Link>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVars}
          initial="hidden"
          animate="show"
        >
          {history.map((item) => (
            <motion.div key={item.id} variants={itemVars} className="h-full">
              <Card className="h-full flex flex-col hover:border-primary/30 transition-colors group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold">
                      Score: {item.score}
                    </div>
                  </div>
                  <CardTitle className="text-base line-clamp-2 leading-tight">
                    "{item.pitch}"
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-auto pt-4 flex items-center justify-between border-t mt-4 pb-4">
                  <div className="flex -space-x-1">
                    {item.platforms.slice(0, 3).map((p, i) => (
                      <span key={i} className="inline-block w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase" title={p}>
                        {p.charAt(0)}
                      </span>
                    ))}
                    {item.platforms.length > 3 && (
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                        +{item.platforms.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
