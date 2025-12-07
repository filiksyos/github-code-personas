'use client'

import { GitHubUser } from '@/types'
import { ExternalLink, Users, GitFork } from 'lucide-react'

interface UserProfileProps {
  user: GitHubUser
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
      <div className="flex items-start gap-6">
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="w-24 h-24 rounded-full border-4 border-purple-500"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">
                {user.name || user.login}
              </h2>
              <p className="text-slate-400 text-lg">@{user.login}</p>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              View Profile <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          {user.bio && (
            <p className="mt-4 text-slate-300">{user.bio}</p>
          )}

          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2 text-slate-300">
              <GitFork className="w-5 h-5" />
              <span className="font-semibold">{user.public_repos}</span>
              <span className="text-slate-400">repositories</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-5 h-5" />
              <span className="font-semibold">{user.followers}</span>
              <span className="text-slate-400">followers</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="w-5 h-5" />
              <span className="font-semibold">{user.following}</span>
              <span className="text-slate-400">following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}