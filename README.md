# Repo Story Generator 📖

Transform GitHub repository history into a narrative story about the development process.

## The Idea

**Problem:** GitHub shows *what* was built, not *why* or *how*. The creative journey - pivots, dead ends, breakthroughs - is hidden in noisy commit history.

**Solution:** Analyze commit history algorithmically, then generate a human-readable narrative explaining the development journey.

## Why This Matters

### Who Benefits:
1. **Developers** - Understanding architectural decisions through evolution
2. **New contributors** - Faster onboarding by seeing the story
3. **Content creators** - Document build processes for YouTube/blogs
4. **Portfolio/hiring** - Show how you think and iterate, not just end results
5. **Educators** - Teaching real development workflows
6. **Open source maintainers** - Attract contributors with compelling stories

### Use Cases:
- Portfolio content ("here's how I built X")
- Onboarding docs for new team members
- Blog posts about development journey
- Conference talk material
- Learning resources ("how real projects evolve")

## Architecture

### Three-Layer Approach

**Layer 1: Data Engineering (70% of value) - No LLM**
- Fetch full git history via GitHub API
- Parse & classify commits (feature/fix/refactor/noise)
- Filter noise (merge commits, "wip", typos)
- Detect patterns & milestones
- Calculate impact scores
- Group into logical chapters

**Layer 2: LLM Narrative (20% of value) - Optional**
- Takes structured data (not raw git)
- Generates readable prose
- Connects the dots across commits
- Consistent, optimized prompts

**Layer 3: UX & Polish (10% of value)**
- Interactive timeline visualization
- Export to Markdown/PDF
- Embeddable widgets
- Caching for performance

### Why Not "Just Paste Into Claude"?

Manual approach requires:
- Clone repo → run git commands → copy/paste → write prompts → filter noise → iterate
- Time: 30-60 minutes per repo
- Tokens: 20k-50k (expensive & slow)
- Quality: Inconsistent

This tool:
- One-click → automated analysis → structured data → optimized LLM prompt
- Time: 30-60 seconds
- Tokens: 2k-5k (cheap & fast)
- Quality: Consistent

**The moat is the preprocessing, not the LLM.**

## Technical Process

```
GitHub API
    ↓
Parse all commits
    ↓
Classify (feature/fix/refactor/noise)
    ↓
Filter noise (80% reduction)
    ↓
Detect milestones (refactors, pivots, breakthroughs)
    ↓
Group into chapters
    ↓
Structured JSON (2k tokens)
    ↓
[Optional] LLM narrative generation
    ↓
Output: Timeline + Story
```

## Quick Start

```bash
# Install dependencies
npm install

# Set GitHub token (for private repos & higher rate limits)
echo "GITHUB_TOKEN=your_token_here" > .env

# Run analysis on a repo
node index.js vvanessaww/git-art

# Output will be saved to output/git-art-story.md
```

## Example Output

```markdown
# git-art Development Story

## Timeline Overview
- **Duration:** Feb 25, 2026 (19 hours)
- **Commits:** 45 (33 meaningful, 12 noise filtered)
- **Contributors:** 1
- **Major refactors:** 3

## Chapter 1: Setup Phase
*Feb 25, 04:00 - 08:00 (4 hours)*

The project began as a terminal-themed GitHub contribution visualizer...

Features added:
- React + Vite setup
- Canvas rendering engine
- Rainbow gradient style

## Chapter 2: Feature Expansion  
*Feb 25, 08:00 - 16:00 (8 hours)*

Rapid iteration on art styles. Multiple experiments, some successful...

Features added:
- Tetris blocks
- Pac-Man arcade theme
- Custom text overlay

Dead ends:
- Spiral visualization (removed after 2 hours)
- Audio visualizer (removed)

## Chapter 3: Production Ready
*Feb 25, 16:00 - 23:00 (7 hours)*

Final push for production deployment...
```

## Prototype Features

### ✅ Implemented:
- [x] GitHub API integration
- [x] Commit classification (feature/fix/refactor/noise)
- [x] Noise filtering
- [x] Milestone detection
- [x] Chapter grouping
- [x] Markdown export
- [x] Statistics generation

### 🚧 Future Enhancements:
- [ ] LLM narrative generation (currently mockable)
- [ ] Code diff analysis for deeper insights
- [ ] Multi-contributor story support
- [ ] Interactive timeline UI
- [ ] Export to PDF/HTML
- [ ] Cached processing for large repos
- [ ] CLI with progress bars
- [ ] Web interface

## Tech Stack

- **Node.js** - Runtime
- **Octokit** - GitHub API client
- **dotenv** - Environment config
- **[Future] Anthropic SDK** - For narrative generation

## Ideation Notes

### Original Discussion (Feb 25, 2026)

**Core Insight:** Most people see the polished end product. The messy reality of development - the pivots, dead ends, and breakthroughs - is hidden. This tool surfaces that story.

**Differentiator from "just use ChatGPT":**
1. **Automated data extraction** - No manual git log copy/paste
2. **Intelligent filtering** - 80% of commits are noise
3. **Pattern detection** - Algorithmic milestone identification
4. **Structured preprocessing** - 2k tokens vs 20k+
5. **Consistent output** - Optimized prompts, repeatable results
6. **One-click UX** - 30 seconds vs 30 minutes

**Key Features That Add Value:**
- "Behind the Scenes" - Show deleted code/abandoned features
- "Aha Moments" - Detect breakthroughs after long pauses
- "Tech Evolution" - Dependency changes as plot points
- "Team Dynamics" - Multi-contributor narratives
- "Lessons Learned" - Extract wisdom from refactors

### Production Considerations

**Challenges:**
- Commit message quality varies wildly
- Large repos (10k+ commits) need pagination
- API rate limits (5000/hour authenticated)
- Private repos need OAuth flow
- LLM costs for narrative generation

**Business Model Ideas:**
- **Free tier:** Public repos, basic story
- **Pro ($9/mo):** Private repos, LLM narratives, exports
- **GitHub App:** Auto-generate STORY.md on push
- **CLI tool:** `npm install -g repo-story`

## Project Structure

```
repo-story/
├── index.js              # Main entry point
├── src/
│   ├── analyzer.js       # Commit classification & analysis
│   ├── github.js         # GitHub API wrapper
│   ├── milestones.js     # Pattern & milestone detection
│   ├── chapters.js       # Grouping logic
│   └── export.js         # Markdown/PDF generation
├── output/               # Generated stories
├── .env.example          # Environment template
└── README.md             # This file
```

## Contributing

This is a prototype/reference implementation. Future enhancements welcome:
- Better commit classification heuristics
- More milestone detection patterns
- LLM integration examples
- UI/visualization layer

## License

MIT

## Author

Built as a prototype to explore the concept of "development process storytelling."

---

**Status:** 🚧 Prototype - Built in ~1 hour as proof-of-concept. Not production-ready but demonstrates the core value proposition.
