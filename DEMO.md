# Demo Output

This file shows example output from running the prototype on itself.

## Command

```bash
node index.js vvanessaww/git-art
```

## Console Output

```
🎬 Starting repo story generation...

📦 Repository: vvanessaww/git-art

📡 Fetching commits for vvanessaww/git-art...
   Fetched page 1 (54 commits)
✅ Total commits fetched: 54

🔍 Analyzing commits...
   Total commits: 54
   Noise filtered: 1
   Meaningful: 53

🎯 Detecting milestones...
   Found 7 milestones

📚 Grouping commits into chapters...
   Created 3 chapters

📝 Generating markdown story...
✅ Story saved to ./output/vvanessaww-git-art-story.md

✨ Done!

📄 Output: ./output/vvanessaww-git-art-story.md

Next steps:
  - Review the generated story
  - Add narrative with LLM (optional)
  - Customize chapter titles
  - Share on your portfolio/blog
```

## Processing Time

**~5 seconds** from start to finish (54 commits analyzed)

## Generated Story

See `./output/vvanessaww-git-art-story.md` for the full generated output.

**Key features demonstrated:**
- ✅ Commit classification (15 features, 10 bugfixes, 6 removals, etc.)
- ✅ Noise filtering (1 commit filtered out)
- ✅ Milestone detection (7 key moments identified)
- ✅ Chapter grouping (3 logical phases: Genesis, Feature Development, Polish)
- ✅ Timeline analysis (18 hours of development)
- ✅ Markdown export with stats and breakdown

## What Makes This Useful

Instead of reading 54 raw git commits, you get:
- **High-level overview** - Duration, language, commit breakdown
- **Key moments** - 7 milestones highlighting pivots and major changes
- **Narrative structure** - 3 chapters grouping related work
- **Notable changes** - Important commits surfaced automatically
- **Context** - See removals (dead ends) alongside additions

This would take **30+ minutes to do manually** - the tool did it in **5 seconds**.
