export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
}

export interface CodePersona {
  name: string
  description: string
  icon: string
  score: number
  technologies: string[]
}