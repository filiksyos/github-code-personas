import { CodePersona } from '@/types'

interface Repository {
  language: string | null
  topics?: string[]
  name: string
  description: string | null
  stargazers_count: number
  fork: boolean
}

export function analyzePersonas(repos: Repository[]): CodePersona[] {
  // Filter out forked repos for more accurate analysis
  const originalRepos = repos.filter(repo => !repo.fork)
  
  // Count languages
  const languageCounts: Record<string, number> = {}
  const topicCounts: Record<string, number> = {}
  
  originalRepos.forEach(repo => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
    }
    repo.topics?.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1
    })
  })

  const personas: CodePersona[] = []
  const totalRepos = originalRepos.length || 1

  // Frontend Artist
  const frontendLangs = ['JavaScript', 'TypeScript', 'CSS', 'HTML', 'Vue', 'Svelte']
  const frontendCount = frontendLangs.reduce((sum, lang) => sum + (languageCounts[lang] || 0), 0)
  const frontendTopics = ['react', 'vue', 'angular', 'nextjs', 'ui', 'frontend', 'tailwind']
  const frontendTopicCount = frontendTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0)
  const frontendScore = Math.min(100, Math.round(((frontendCount + frontendTopicCount * 2) / totalRepos) * 100))
  
  if (frontendScore > 20) {
    personas.push({
      name: 'Frontend Artist',
      description: 'Crafting beautiful user interfaces and experiences',
      icon: '🎨',
      score: frontendScore,
      technologies: Object.keys(languageCounts).filter(lang => frontendLangs.includes(lang))
    })
  }

  // Backend Engineer
  const backendLangs = ['Python', 'Java', 'Go', 'Rust', 'C#', 'PHP', 'Ruby']
  const backendCount = backendLangs.reduce((sum, lang) => sum + (languageCounts[lang] || 0), 0)
  const backendTopics = ['api', 'backend', 'server', 'nodejs', 'express', 'django', 'flask']
  const backendTopicCount = backendTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0)
  const backendScore = Math.min(100, Math.round(((backendCount + backendTopicCount * 2) / totalRepos) * 100))
  
  if (backendScore > 20) {
    personas.push({
      name: 'Backend Engineer',
      description: 'Building robust APIs and server-side logic',
      icon: '⚙️',
      score: backendScore,
      technologies: Object.keys(languageCounts).filter(lang => backendLangs.includes(lang))
    })
  }

  // Mobile Developer
  const mobileLangs = ['Swift', 'Kotlin', 'Dart', 'Java']
  const mobileCount = mobileLangs.reduce((sum, lang) => sum + (languageCounts[lang] || 0), 0)
  const mobileTopics = ['ios', 'android', 'mobile', 'flutter', 'react-native', 'swiftui']
  const mobileTopicCount = mobileTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0)
  const mobileScore = Math.min(100, Math.round(((mobileCount + mobileTopicCount * 2) / totalRepos) * 100))
  
  if (mobileScore > 15) {
    personas.push({
      name: 'Mobile Developer',
      description: 'Creating native and cross-platform mobile apps',
      icon: '📱',
      score: mobileScore,
      technologies: Object.keys(languageCounts).filter(lang => mobileLangs.includes(lang))
    })
  }

  // AI/ML Enthusiast
  const aiTopics = ['machine-learning', 'deep-learning', 'ai', 'neural-network', 'tensorflow', 'pytorch', 'llm']
  const aiTopicCount = aiTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0)
  const pythonForAI = (languageCounts['Python'] || 0) * 0.3
  const aiScore = Math.min(100, Math.round(((aiTopicCount * 3 + pythonForAI) / totalRepos) * 100))
  
  if (aiScore > 15) {
    personas.push({
      name: 'AI/ML Enthusiast',
      description: 'Exploring artificial intelligence and machine learning',
      icon: '🤖',
      score: aiScore,
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'].filter(tech => 
        languageCounts['Python'] || aiTopicCount > 0
      )
    })
  }

  // DevOps Specialist
  const devopsTopics = ['docker', 'kubernetes', 'ci-cd', 'devops', 'terraform', 'ansible', 'aws', 'cloud']
  const devopsTopicCount = devopsTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0)
  const devopsScore = Math.min(100, Math.round((devopsTopicCount * 4 / totalRepos) * 100))
  
  if (devopsScore > 15) {
    personas.push({
      name: 'DevOps Specialist',
      description: 'Automating deployments and infrastructure',
      icon: '🔧',
      score: devopsScore,
      technologies: ['Docker', 'Kubernetes', 'CI/CD', 'AWS']
    })
  }

  // Data Scientist
  const dataTopics = ['data-science', 'data-analysis', 'visualization', 'jupyter', 'pandas', 'numpy']
  const dataTopicCount = dataTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0)
  const dataLangs = ['R', 'Julia', 'Python']
  const dataLangCount = dataLangs.reduce((sum, lang) => sum + (languageCounts[lang] || 0), 0)
  const dataScore = Math.min(100, Math.round(((dataTopicCount * 3 + dataLangCount * 0.5) / totalRepos) * 100))
  
  if (dataScore > 15) {
    personas.push({
      name: 'Data Scientist',
      description: 'Analyzing data and extracting insights',
      icon: '📊',
      score: dataScore,
      technologies: Object.keys(languageCounts).filter(lang => dataLangs.includes(lang))
    })
  }

  // Game Developer
  const gameLangs = ['C++', 'C#', 'GDScript']
  const gameCount = gameLangs.reduce((sum, lang) => sum + (languageCounts[lang] || 0), 0)
  const gameTopics = ['game', 'unity', 'unreal', 'godot', 'gamedev']
  const gameTopicCount = gameTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0)
  const gameScore = Math.min(100, Math.round(((gameCount * 0.5 + gameTopicCount * 4) / totalRepos) * 100))
  
  if (gameScore > 15) {
    personas.push({
      name: 'Game Developer',
      description: 'Building interactive gaming experiences',
      icon: '🎮',
      score: gameScore,
      technologies: Object.keys(languageCounts).filter(lang => gameLangs.includes(lang))
    })
  }

  // Full Stack Developer
  if (frontendScore > 30 && backendScore > 30) {
    const fullStackScore = Math.min(100, Math.round((frontendScore + backendScore) / 2))
    personas.push({
      name: 'Full Stack Developer',
      description: 'Mastering both frontend and backend development',
      icon: '🌐',
      score: fullStackScore,
      technologies: [...new Set([
        ...Object.keys(languageCounts).filter(lang => frontendLangs.includes(lang)),
        ...Object.keys(languageCounts).filter(lang => backendLangs.includes(lang))
      ])]
    })
  }

  // Sort by score
  return personas.sort((a, b) => b.score - a.score)
}