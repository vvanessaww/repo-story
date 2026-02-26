import { writeFileSync, mkdirSync } from 'fs'
import { ChapterBuilder } from './chapters.js'

export class StoryExporter {
  constructor() {
    this.chapterBuilder = new ChapterBuilder()
  }
  
  generateMarkdown(repoInfo, commits, milestones, chapters, stats) {
    console.log('📝 Generating markdown story...')
    
    let md = `# ${repoInfo.name} - Development Story\n\n`
    
    md += `> ${repoInfo.description || 'No description'}\n\n`
    
    // Overview
    md += `## 📊 Overview\n\n`
    md += `- **Repository:** [${repoInfo.full_name}](${repoInfo.html_url})\n`
    md += `- **Created:** ${new Date(repoInfo.created_at).toLocaleDateString()}\n`
    md += `- **Total commits analyzed:** ${stats.all}\n`
    md += `- **Meaningful commits:** ${stats.meaningful}\n`
    md += `- **Noise filtered:** ${stats.all - stats.meaningful}\n`
    md += `- **Primary language:** ${repoInfo.language || 'Unknown'}\n\n`
    
    // Timeline
    if (chapters.length > 0) {
      const firstCommit = chapters[0].commits[0]
      const lastCommit = chapters[chapters.length - 1].commits.slice(-1)[0]
      const duration = lastCommit.date - firstCommit.date
      const days = Math.floor(duration / (1000 * 60 * 60 * 24))
      const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      
      md += `**Development Timeline:**  \n`
      md += `${firstCommit.date.toISOString().substring(0, 10)} → ${lastCommit.date.toISOString().substring(0, 10)} `
      if (days > 0) {
        md += `(${days} days, ${hours} hours)\n\n`
      } else {
        md += `(${hours} hours)\n\n`
      }
    }
    
    // Commit breakdown
    md += `## 📈 Commit Breakdown\n\n`
    md += `| Type | Count |\n`
    md += `|------|-------|\n`
    Object.entries(stats.byType).forEach(([type, count]) => {
      md += `| ${type} | ${count} |\n`
    })
    md += `\n`
    
    // Milestones
    if (milestones.length > 0) {
      md += `## 🎯 Key Milestones\n\n`
      milestones.slice(0, 10).forEach(m => {
        const commit = m.commit || m.commits?.[0]
        if (commit) {
          md += `- **${this.formatMilestoneType(m.type)}** - ${commit.message} (${commit.sha})\n`
          md += `  - *${m.reason}*\n`
        }
      })
      md += `\n`
    }
    
    // Chapters
    md += `## 📖 Development Chapters\n\n`
    chapters.forEach(chapter => {
      md += `### Chapter ${chapter.id}: ${chapter.title}\n\n`
      md += `*${this.chapterBuilder.formatTimespan(chapter.startDate, chapter.endDate)}*\n\n`
      
      md += `**Activity:**  \n`
      md += `- ${chapter.commits.length} commits\n`
      if (chapter.features.length > 0) {
        md += `- ${chapter.features.length} features added\n`
      }
      if (chapter.refactors.length > 0) {
        md += `- ${chapter.refactors.length} refactors\n`
      }
      if (chapter.removals.length > 0) {
        md += `- ${chapter.removals.length} removals\n`
      }
      md += `\n`
      
      // Show notable commits
      const notable = chapter.commits.filter(c => c.impact >= 3 || c.type === 'feature')
      if (notable.length > 0) {
        md += `**Notable changes:**\n`
        notable.slice(0, 5).forEach(c => {
          md += `- ${c.message} (\`${c.sha}\`)\n`
        })
        md += `\n`
      }
      
      md += `---\n\n`
    })
    
    // Footer
    md += `## 🔍 Analysis Notes\n\n`
    md += `This story was generated automatically by analyzing commit history.\n\n`
    md += `**Methodology:**\n`
    md += `1. Fetch all commits via GitHub API\n`
    md += `2. Classify commits (feature/fix/refactor/noise)\n`
    md += `3. Filter noise (merge commits, "wip", typos)\n`
    md += `4. Detect patterns & milestones\n`
    md += `5. Group into logical chapters\n`
    md += `6. Generate narrative structure\n\n`
    md += `*Generated on ${new Date().toISOString().substring(0, 10)}*\n`
    
    return md
  }
  
  formatMilestoneType(type) {
    const icons = {
      genesis: '🌱',
      major_refactor: '🔧',
      feature_burst: '🚀',
      removal: '🗑️',
      breakthrough: '💡'
    }
    
    const labels = {
      genesis: 'Genesis',
      major_refactor: 'Major Refactor',
      feature_burst: 'Feature Burst',
      removal: 'Code Removed',
      breakthrough: 'Breakthrough'
    }
    
    return `${icons[type] || '📌'} ${labels[type] || type}`
  }
  
  saveToFile(markdown, repoName) {
    try {
      mkdirSync('./output', { recursive: true })
    } catch (e) {
      // Directory exists
    }
    
    const filename = `./output/${repoName.replace('/', '-')}-story.md`
    writeFileSync(filename, markdown, 'utf8')
    
    console.log(`✅ Story saved to ${filename}`)
    return filename
  }
}
