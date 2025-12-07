'use client'

import { CodePersona } from '@/types'

interface PersonaCardProps {
  persona: CodePersona
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-blue-500 to-cyan-600'
    if (score >= 40) return 'from-yellow-500 to-orange-600'
    return 'from-purple-500 to-pink-600'
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{persona.icon}</div>
        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getScoreColor(persona.score)} text-white font-bold text-sm`}>
          {persona.score}%
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">
        {persona.name}
      </h3>
      
      <p className="text-slate-300 text-sm mb-4">
        {persona.description}
      </p>

      {persona.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {persona.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}