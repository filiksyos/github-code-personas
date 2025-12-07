import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'
import { analyzePersonas } from '@/utils/personaAnalyzer'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    )
  }

  try {
    // Fetch user data
    const { data: user } = await octokit.users.getByUsername({
      username,
    })

    // Fetch user's repositories
    const { data: repos } = await octokit.repos.listForUser({
      username,
      per_page: 100,
      sort: 'updated',
    })

    // Analyze and generate personas
    const personas = analyzePersonas(repos)

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        html_url: user.html_url,
      },
      personas,
    })
  } catch (error: any) {
    console.error('Error analyzing user:', error)
    
    if (error.status === 404) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to analyze user profile' },
      { status: 500 }
    )
  }
}