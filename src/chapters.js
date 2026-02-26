export class ChapterBuilder {
  groupIntoChapters(commits) {
    console.log('📚 Grouping commits into chapters...')
    
    if (commits.length === 0) return []
    
    // Sort commits chronologically (oldest first)
    const sorted = [...commits].sort((a, b) => a.date - b.date)
    
    const chapters = []
    let currentChapter = null
    
    sorted.forEach((commit, i) => {
      if (i === 0) {
        // Start first chapter
        currentChapter = {
          id: 1,
          title: this.inferChapterTitle(commit, 'Setup Phase'),
          startDate: commit.date,
          endDate: commit.date,
          commits: [commit],
          features: [],
          removals: [],
          refactors: []
        }
        return
      }
      
      // Check if we should start a new chapter
      const timeDiff = commit.date - currentChapter.endDate
      const hoursDiff = timeDiff / (1000 * 60 * 60)
      
      const shouldStartNewChapter = (
        hoursDiff > 12 || // Long gap
        currentChapter.commits.length > 20 || // Too many commits
        (commit.type === 'major_refactor' && currentChapter.commits.length > 5) // Major shift
      )
      
      if (shouldStartNewChapter) {
        chapters.push(currentChapter)
        
        currentChapter = {
          id: chapters.length + 1,
          title: this.inferChapterTitle(commit, `Phase ${chapters.length + 1}`),
          startDate: commit.date,
          endDate: commit.date,
          commits: [commit],
          features: [],
          removals: [],
          refactors: []
        }
      } else {
        currentChapter.commits.push(commit)
        currentChapter.endDate = commit.date
      }
      
      // Categorize commit
      if (commit.type === 'feature') {
        currentChapter.features.push(commit)
      } else if (commit.type === 'removal') {
        currentChapter.removals.push(commit)
      } else if (commit.type === 'refactor' || commit.impact >= 4) {
        currentChapter.refactors.push(commit)
      }
    })
    
    // Add last chapter
    if (currentChapter) {
      chapters.push(currentChapter)
    }
    
    // Refine chapter titles
    chapters.forEach((ch, i) => {
      if (i === 0) {
        ch.title = 'Genesis'
      } else if (i === chapters.length - 1) {
        ch.title = 'Polish & Production'
      } else if (ch.features.length > ch.commits.length * 0.6) {
        ch.title = 'Feature Expansion'
      } else if (ch.refactors.length > 2) {
        ch.title = 'Refactoring'
      }
    })
    
    console.log(`   Created ${chapters.length} chapters`)
    return chapters
  }
  
  inferChapterTitle(commit, fallback) {
    if (commit.type === 'feature') return 'Feature Development'
    if (commit.type === 'refactor') return 'Refactoring'
    if (commit.type === 'bugfix') return 'Bug Fixes'
    return fallback
  }
  
  formatTimespan(startDate, endDate) {
    const duration = endDate - startDate
    const hours = Math.round(duration / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    const start = startDate.toISOString().substring(0, 16).replace('T', ' ')
    const end = endDate.toISOString().substring(0, 16).replace('T', ' ')
    
    if (days > 0) {
      return `${start} to ${end} (${days}d ${hours % 24}h)`
    } else {
      return `${start} to ${end} (${hours}h)`
    }
  }
}
