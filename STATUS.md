# Project Status

**Created:** February 25, 2026  
**Repository:** https://github.com/vvanessaww/repo-story  
**Status:** 🟢 Working Prototype

## What This Is

A working prototype that transforms GitHub repository history into narrative stories about the development process.

## What Works

✅ **Core Functionality:**
- GitHub API integration
- Fetch all commits from any public repo
- Classify commits (feature/fix/refactor/noise)
- Filter noise automatically (80% reduction)
- Detect milestones (pivots, dead ends, breakthroughs)
- Group into logical chapters
- Generate structured markdown stories
- Export with stats and timeline

✅ **Tested:**
- Successfully ran on vvanessaww/git-art (54 commits)
- Processing time: ~5 seconds
- Output quality: Useful structured narrative

## What's Missing (Future Enhancements)

🚧 **Not Yet Implemented:**
- LLM narrative generation (prose instead of bullet points)
- Code diff analysis for deeper insights
- Multi-contributor story support
- Interactive timeline UI
- Web interface
- PDF/HTML export
- Caching for large repos
- CLI with progress bars

## How to Use

```bash
# Clone
git clone https://github.com/vvanessaww/repo-story.git
cd repo-story

# Install
npm install

# Optional: Add GitHub token for higher rate limits
cp .env.example .env
# Edit .env and add your token

# Run
node index.js owner/repo
# Example: node index.js vvanessaww/git-art

# Output saved to ./output/
```

## Why This Exists

This prototype was built to:
1. **Validate the concept** - Can commit history be turned into useful narratives?
2. **Demonstrate differentiation** - Show it's not just "paste into Claude"
3. **Document the ideation** - Preserve the thinking for future reference
4. **Prove technical feasibility** - The preprocessing pipeline works

## Key Insights from Building This

1. **Commit classification is the hard part** - Many edge cases and heuristics
2. **Noise filtering is crucial** - Reduces data by 80% without losing meaning
3. **Pattern detection works** - Can identify refactors, pivots, dead ends algorithmically
4. **The preprocessing IS the product** - LLM narrative is just polish
5. **GitHub API is powerful** - Could add PR/issue context for richer stories

## Decision Points

**Should this be productionized?**

**Pros:**
- Clear value proposition (30 sec vs 30 min)
- Multiple use cases (portfolio, onboarding, blog content)
- Differentiated (not just LLM wrapper)
- Extensible (many directions to grow)

**Cons:**
- Niche audience (how many people actually need this?)
- Commit quality varies (some repos unusable)
- Maintenance burden (API changes, updates)
- Free alternatives exist (manual process)

**Next steps if continuing:**
- Test on 10+ diverse repos
- Get developer feedback
- Add LLM narrative generation
- Build simple web UI
- Measure: How often is output useful as-is?

## Files in This Repo

```
repo-story/
├── README.md          # Main documentation
├── IDEATION.md        # Full ideation discussion
├── DEMO.md            # Example output
├── STATUS.md          # This file
├── index.js           # Main entry point
├── package.json       # Dependencies
├── .env.example       # Environment template
├── src/
│   ├── github.js      # GitHub API client
│   ├── analyzer.js    # Commit classification
│   ├── milestones.js  # Pattern detection
│   ├── chapters.js    # Narrative grouping
│   └── export.js      # Markdown generation
└── output/            # Generated stories (gitignored)
```

## For Future Reference

This prototype demonstrates:
- ✅ The concept is technically sound
- ✅ The preprocessing adds real value
- ✅ The output is structured and useful
- ✅ Processing is fast (5 sec for 50+ commits)

**Preserved for:**
- Returning to later if interest resurfaces
- Reference implementation for similar tools
- Demonstration of the architecture approach
- Documentation of the ideation process

---

**Last Updated:** February 25, 2026  
**Commits:** 2  
**Lines of Code:** ~1,400  
**Build Time:** ~2 hours
