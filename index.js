#!/usr/bin/env node

import 'dotenv/config'
import { GitHubClient } from './src/github.js'
import { CommitAnalyzer } from './src/analyzer.js'
import { MilestoneDetector } from './src/milestones.js'
import { ChapterBuilder } from './src/chapters.js'
import { StoryExporter } from './src/export.js'

async function main() {
  // Parse command line args
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('Usage: node index.js <owner/repo>')
    console.log('Example: node index.js vvanessaww/git-art')
    process.exit(1)
  }
  
  const [owner, repo] = args[0].split('/')
  
  if (!owner || !repo) {
    console.error('❌ Invalid format. Use: owner/repo')
    process.exit(1)
  }
  
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.warn('⚠️  No GITHUB_TOKEN found. Rate limits will be low.')
    console.warn('   Set GITHUB_TOKEN in .env for better limits.')
  }
  
  console.log('\n🎬 Starting repo story generation...\n')
  console.log(`📦 Repository: ${owner}/${repo}\n`)
  
  try {
    // 1. Fetch data
    const github = new GitHubClient(token)
    const repoInfo = await github.getRepoInfo(owner, repo)
    const commits = await github.getRepoCommits(owner, repo)
    
    console.log('')
    
    // 2. Analyze commits
    const analyzer = new CommitAnalyzer()
    const { all, meaningful } = analyzer.analyzeCommits(commits)
    const stats = analyzer.getStatistics(meaningful)
    
    console.log('')
    
    // 3. Detect milestones
    const milestoneDetector = new MilestoneDetector()
    const milestones = milestoneDetector.detectMilestones(meaningful)
    
    console.log('')
    
    // 4. Build chapters
    const chapterBuilder = new ChapterBuilder()
    const chapters = chapterBuilder.groupIntoChapters(meaningful)
    
    console.log('')
    
    // 5. Generate & export
    const exporter = new StoryExporter()
    const markdown = exporter.generateMarkdown(
      repoInfo,
      commits,
      milestones,
      chapters,
      {
        all: all.length,
        meaningful: meaningful.length,
        byType: stats.byType
      }
    )
    
    const filename = exporter.saveToFile(markdown, `${owner}-${repo}`)
    
    console.log('\n✨ Done!\n')
    console.log(`📄 Output: ${filename}`)
    console.log(`\nNext steps:`)
    console.log(`  - Review the generated story`)
    console.log(`  - Add narrative with LLM (optional)`)
    console.log(`  - Customize chapter titles`)
    console.log(`  - Share on your portfolio/blog\n`)
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
