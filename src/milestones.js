export class MilestoneDetector {
  detectMilestones(commits) {
    console.log('🎯 Detecting milestones...')
    
    const milestones = []
    
    // 1. First commit
    if (commits.length > 0) {
      milestones.push({
        type: 'genesis',
        commit: commits[commits.length - 1],
        reason: 'Project genesis'
      })
    }
    
    // 2. Major refactors (high impact)
    commits.forEach(c => {
      if (c.impact >= 5) {
        milestones.push({
          type: 'major_refactor',
          commit: c,
          reason: `Large refactor (${c.stats.total} lines)`
        })
      }
    })
    
    // 3. Feature bursts (many features in short time)
    const featureCommits = commits.filter(c => c.type === 'feature')
    let featureBurst = []
    
    featureCommits.forEach((c, i) => {
      if (i === 0) {
        featureBurst = [c]
        return
      }
      
      const timeDiff = c.date - featureCommits[i - 1].date
      const hoursDiff = timeDiff / (1000 * 60 * 60)
      
      if (hoursDiff < 4) {
        featureBurst.push(c)
      } else {
        if (featureBurst.length >= 3) {
          milestones.push({
            type: 'feature_burst',
            commits: featureBurst,
            reason: `${featureBurst.length} features in quick succession`
          })
        }
        featureBurst = [c]
      }
    })
    
    // 4. Removals (abandoned features)
    const removals = commits.filter(c => c.type === 'removal')
    removals.forEach(r => {
      milestones.push({
        type: 'removal',
        commit: r,
        reason: 'Feature or code removed (pivot/cleanup)'
      })
    })
    
    // 5. Long gaps followed by activity (breakthrough moments)
    commits.forEach((c, i) => {
      if (i === 0) return
      
      const timeDiff = c.date - commits[i - 1].date
      const hoursDiff = timeDiff / (1000 * 60 * 60)
      
      if (hoursDiff > 24) { // Gap longer than 1 day
        milestones.push({
          type: 'breakthrough',
          commit: c,
          reason: `Activity resumed after ${Math.round(hoursDiff)} hour gap`
        })
      }
    })
    
    // Sort by date
    milestones.sort((a, b) => {
      const dateA = a.commit ? a.commit.date : a.commits[0].date
      const dateB = b.commit ? b.commit.date : b.commits[0].date
      return dateB - dateA
    })
    
    console.log(`   Found ${milestones.length} milestones`)
    return milestones
  }
}
