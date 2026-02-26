import { Octokit } from '@octokit/rest'

export class GitHubClient {
  constructor(token) {
    this.octokit = new Octokit({ auth: token })
  }

  async getRepoCommits(owner, repo) {
    console.log(`📡 Fetching commits for ${owner}/${repo}...`)
    
    try {
      const commits = []
      let page = 1
      let hasMore = true
      
      while (hasMore) {
        const response = await this.octokit.repos.listCommits({
          owner,
          repo,
          per_page: 100,
          page
        })
        
        commits.push(...response.data)
        console.log(`   Fetched page ${page} (${response.data.length} commits)`)
        
        if (response.data.length < 100) {
          hasMore = false
        } else {
          page++
        }
      }
      
      console.log(`✅ Total commits fetched: ${commits.length}`)
      return commits
    } catch (error) {
      console.error('❌ Error fetching commits:', error.message)
      throw error
    }
  }

  async getRepoInfo(owner, repo) {
    try {
      const response = await this.octokit.repos.get({ owner, repo })
      return response.data
    } catch (error) {
      console.error('❌ Error fetching repo info:', error.message)
      throw error
    }
  }

  async getCommitDetails(owner, repo, sha) {
    try {
      const response = await this.octokit.repos.getCommit({ owner, repo, ref: sha })
      return response.data
    } catch (error) {
      console.error(`❌ Error fetching commit ${sha}:`, error.message)
      throw error
    }
  }
}
