'use client'

import { CodePersona } from '@/types'
import PersonaCard from './PersonaCard'

interface PersonasListProps {
  personas: CodePersona[]
}

export default function PersonasList({ personas }: PersonasListProps) {
  if (personas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">No personas detected. Try analyzing a user with more repositories!</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">
        Code Personas <span className="text-slate-400 text-xl">({personas.length})</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => (
          <PersonaCard key={index} persona={persona} />
        ))}
      </div>
    </div>
  )
}