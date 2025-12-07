# GitHub Code Personas

A Next.js application that analyzes GitHub user profiles and generates code personas based on their coding patterns, languages, and repository activity.

## Features

- 🔍 Search any GitHub username
- 👤 View user profile information
- 🎭 Discover code personas based on:
  - Programming languages used
  - Repository topics and types
  - Contribution patterns
  - Project complexity

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/filiksyos/github-code-personas.git
cd github-code-personas
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. (Optional) Add GitHub token for higher rate limits:
```bash
cp .env.example .env
# Edit .env and add your GitHub token
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Code Personas

The app identifies various developer personas such as:

- 🎨 **Frontend Artist** - Focus on UI/UX with React, Vue, CSS
- ⚙️ **Backend Engineer** - API and server-side development
- 📱 **Mobile Developer** - iOS, Android, React Native
- 🤖 **AI/ML Enthusiast** - Machine learning and data science
- 🎮 **Game Developer** - Game engines and interactive experiences
- 🔧 **DevOps Specialist** - CI/CD, containerization, cloud
- 📊 **Data Scientist** - Analytics, visualization, statistics
- 🌐 **Full Stack Developer** - Both frontend and backend

## Tech Stack

- **Framework**: Next.js 14.2.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: GitHub REST API (@octokit/rest)
- **Icons**: Lucide React

## License

MIT