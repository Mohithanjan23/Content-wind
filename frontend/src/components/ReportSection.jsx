import React from 'react'
import ScoreCard from './ScoreCard'
import KeywordsCard from './KeywordsCard'
import OptimizationCard from './OptimizationCard'
import PlatformBreakdownCard from './PlatformBreakdownCard'
import HashtagsCard from './HashtagsCard'
import CompetitorCard from './CompetitorCard'

export default function ReportSection({ result, onDownload }){
  if(!result) return null
  return (
    <div className="mt-6 grid grid-cols-1 gap-4">
      <ScoreCard result={result} onDownload={onDownload} />
      <div className="grid md:grid-cols-2 gap-4">
        <KeywordsCard keywords={result.keywords} trendScore={result.trendScore} relevance={result.keywordRelevance} />
        <OptimizationCard hook={result.hook} retention={result.retention} scriptStarter={result.scriptStarter} />
      </div>
      <PlatformBreakdownCard platforms={result.platforms} />
      <div className="grid md:grid-cols-2 gap-4">
        <HashtagsCard hashtags={result.hashtags} />
        <CompetitorCard competitors={result.competitors} />
      </div>
    </div>
  )
}
