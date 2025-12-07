'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import PersonasList from '@/components/PersonasList'
import UserProfile from '@/components/UserProfile'
import { GitHubUser, CodePersona } from '@/types'

export default function Home() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [personas, setPersonas] = useState<CodePersona[]>([])

  const analyzeUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    setError('')
    setUser(null)
    setPersonas([])

    try {
      const response = await fetch(`/api/analyze?username=${encodeURIComponent(username)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze user')
      }

      setUser(data.user)
      setPersonas(data.personas)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          GitHub Code Personas
        </h1>
        <p className="text-xl text-slate-300">
          Discover your developer identity through GitHub analysis
        </p>
      </div>

      <form onSubmit={analyzeUser} className="mb-12">
        <div className="flex gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="w-full px-6 py-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {user && (
        <div className="space-y-8">
          <UserProfile user={user} />
          <PersonasList personas={personas} />
        </div>
      )}
    </div>
  )
}