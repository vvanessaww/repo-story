export class CommitAnalyzer {
  classifyCommit(commit) {
    const message = commit.commit.message.toLowerCase()
    const files = commit.files || []
    const stats = commit.stats || { additions: 0, deletions: 0, total: 0 }
    
    // Check for noise first
    if (this.isNoise(message)) {
      return { type: 'noise', impact: 0 }
    }
    
    // Conventional commits
    if (message.match(/^feat(\(.*\))?:/)) return { type: 'feature', impact: this.calculateImpact(stats) }
    if (message.match(/^fix(\(.*\))?:/)) return { type: 'bugfix', impact: this.calculateImpact(stats) }
    if (message.match(/^refactor(\(.*\))?:/)) return { type: 'refactor', impact: this.calculateImpact(stats) }
    if (message.match(/^docs?(\(.*\))?:/)) return { type: 'documentation', impact: this.calculateImpact(stats) }
    if (message.match(/^style(\(.*\))?:/)) return { type: 'style', impact: this.calculateImpact(stats) }
    if (message.match(/^test(\(.*\))?:/)) return { type: 'test', impact: this.calculateImpact(stats) }
    
    // Heuristic classification
    if (message.match(/\b(add|new|create|implement|introduce)\b/i)) {
      return { type: 'feature', impact: this.calculateImpact(stats) }
    }
    
    if (message.match(/\b(remove|delete|clean)\b/i)) {
      return { type: 'removal', impact: this.calculateImpact(stats) }
    }
    
    if (message.match(/\b(fix|bug|issue|resolve|patch)\b/i)) {
      return { type: 'bugfix', impact: this.calculateImpact(stats) }
    }
    
    if (message.match(/\b(refactor|restructure|reorganize|rewrite)\b/i)) {
      return { type: 'refactor', impact: this.calculateImpact(stats) }
    }
    
    if (message.match(/\b(update|improve|enhance|optimize)\b/i)) {
      return { type: 'improvement', impact: this.calculateImpact(stats) }
    }
    
    // Default
    return { type: 'other', impact: this.calculateImpact(stats) }
  }
  
  isNoise(message) {
    const noisePatterns = [
      /^wip\b/i,
      /^merge\b/i,
      /^Merge (branch|pull request)/i,
      /^typo\b/i,
      /^fix typo/i,
      /^update readme/i,
      /^bump version/i,
      /^\.\.\./,
      /^asdf/i,
      /^test$/i,
      /^initial commit$/i
    ]
    
    return noisePatterns.some(pattern => pattern.test(message))
  }
  
  calculateImpact(stats) {
    // Simple impact score based on lines changed
    const total = stats.total || 0
    if (total > 500) return 5 // Major
    if (total > 200) return 4 // Large
    if (total > 50) return 3  // Medium
    if (total > 10) return 2  // Small
    return 1 // Tiny
  }
  
  analyzeCommits(commits) {
    console.log('🔍 Analyzing commits...')
    
    const analyzed = commits.map(commit => {
      const classification = this.classifyCommit(commit)
      
      return {
        sha: commit.sha.substring(0, 7),
        message: commit.commit.message.split('\n')[0],
        author: commit.commit.author.name,
        date: new Date(commit.commit.author.date),
        type: classification.type,
        impact: classification.impact,
        stats: commit.stats || { additions: 0, deletions: 0, total: 0 }
      }
    })
    
    // Filter noise
    const meaningful = analyzed.filter(c => c.type !== 'noise')
    
    console.log(`   Total commits: ${commits.length}`)
    console.log(`   Noise filtered: ${commits.length - meaningful.length}`)
    console.log(`   Meaningful: ${meaningful.length}`)
    
    return { all: analyzed, meaningful }
  }
  
  getStatistics(commits) {
    const types = {}
    let totalImpact = 0
    
    commits.forEach(c => {
      types[c.type] = (types[c.type] || 0) + 1
      totalImpact += c.impact
    })
    
    return {
      total: commits.length,
      byType: types,
      averageImpact: totalImpact / commits.length
    }
  }
}
