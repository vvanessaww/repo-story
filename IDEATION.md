# Ideation Notes - Repo Story Generator

**Date:** February 25, 2026  
**Context:** Brainstorming session about turning code commits into development narratives

## The Original Problem

GitHub shows the *what* (final product), not the *why* or *how* (the process).

Developers:
- Make pivots
- Abandon features  
- Have breakthroughs after long pauses
- Iterate through dead ends
- Refactor based on learnings

**All of this is hidden in noisy commit history.**

## The Core Insight

> People connect with **process stories** more than polished products.

The messy reality of building software is:
- More educational than clean final code
- More authentic for portfolios
- Better for onboarding new contributors
- Valuable content for blogs/talks

## The Question

**"What if we could turn a GitHub repo into a story that explains the process of building something?"**

## Why This Matters - Use Cases

1. **Developers:** Understanding architectural decisions through evolution
2. **New Contributors:** Faster onboarding by seeing the journey
3. **Content Creators:** Auto-generate blog posts / YouTube scripts
4. **Portfolio/Hiring:** Show *how you think*, not just *what you built*
5. **Educators:** Teach real development workflows
6. **Open Source:** Tell compelling project stories to attract contributors

## The Technical Challenge

### Naive Approach (Doesn't Work)
```bash
git log --all > commits.txt
# Paste into Claude: "Tell me the story"
```

**Problems:**
- 10k-50k tokens of noisy data
- 80% noise (merge commits, "wip", "fix typo")
- No code context, just messages
- Inconsistent results
- Manual work every time
- Expensive & slow

### Smart Approach (This Tool)

**Layer 1: Intelligent Data Engineering (70% of value)**
```
GitHub API → Parse commits → Classify → Filter noise → 
Detect patterns → Group chapters → Structured JSON (2k tokens)
```

**Layer 2: LLM Narrative (20% of value)**
```
Clean structured data → Optimized prompt → Readable prose
```

**Layer 3: UX (10% of value)**
```
Timeline viz → Export options → Embeddable widgets
```

## The Differentiator

**Not "just a wrapper around Claude":**

The tool does sophisticated **preprocessing**:
- Algorithmic commit classification (feature/fix/refactor/noise)
- Pattern detection (refactors, pivots, breakthroughs)
- Milestone identification (abandoned features, feature bursts, long gaps)
- Impact scoring (lines changed, files affected)
- Chapter grouping (logical narrative structure)
- 90% data reduction (20k → 2k tokens)

**Result:** One-click, 30 seconds, consistent quality vs. manual 30+ minutes

## What Makes a Good "Story Beat"?

Through analysis, we identified key moments worth highlighting:

1. **Genesis** - First commit
2. **Feature Bursts** - Many features in quick succession (iteration)
3. **Major Refactors** - Large changes (>500 lines)
4. **Removals** - Deleted code (pivots, dead ends)
5. **Breakthroughs** - Activity after long pauses (aha moments)
6. **Tech Evolution** - Dependency changes, framework switches

## Architecture Decisions

### Why GitHub API instead of local git?
- Access to PR data, issues, contributors
- No need to clone large repos
- Pagination built-in
- Rate limits manageable with auth

### Why filter before LLM?
- 80% of commits are noise
- Saves tokens & cost
- Faster processing
- More consistent output

### Why chapters instead of timeline?
- Better narrative structure
- Easier to digest
- Natural for blog posts / talks
- Matches how humans tell stories

## Prototype Scope

**Implemented:**
- [x] GitHub API integration
- [x] Commit classification
- [x] Noise filtering  
- [x] Milestone detection
- [x] Chapter grouping
- [x] Markdown export

**Future (if productionized):**
- [ ] LLM narrative generation
- [ ] Code diff analysis
- [ ] Multi-contributor stories
- [ ] Interactive UI
- [ ] PDF/HTML export
- [ ] GitHub App integration
- [ ] Caching for large repos

## Business Model Ideas (If Pursued)

**Free Tier:**
- Public repos only
- Basic structured timeline
- Markdown export

**Pro ($9/mo):**
- Private repos
- LLM-generated narratives
- PDF/HTML export
- Custom branding

**Enterprise:**
- GitHub App (auto STORY.md)
- Team analytics
- Custom LLM prompts

**Alternatives:**
- CLI tool (`npm install -g repo-story`)
- API endpoint for programmatic access
- One-time purchases per repo

## Open Questions

1. **Commit quality:** What if messages are all "asdf" and "wip"?
   - *Answer:* Tool still useful for detecting patterns in code changes, even with bad messages

2. **Large repos:** How to handle 10,000+ commits?
   - *Answer:* Pagination + caching + focus on recent history option

3. **Private repos:** OAuth flow complexity?
   - *Answer:* Start with public repos + PAT, add OAuth later

4. **LLM cost:** Won't narrative generation be expensive?
   - *Answer:* Preprocessing reduces tokens by 90%, make it optional premium feature

## Lessons from Building Prototype

1. **Commit classification is hard** - Many edge cases
2. **Noise filtering is crucial** - 80% reduction makes everything better  
3. **Pattern detection is valuable on its own** - Even without LLM narrative
4. **GitHub API is comprehensive** - Could add PR/issue context
5. **The preprocessing IS the product** - LLM is just polish

## Why This Could Work

1. **Clear value prop:** 30 seconds vs 30 minutes
2. **Differentiated:** Not just "paste into Claude"
3. **Multiple audiences:** Developers, content creators, educators
4. **Low competition:** No direct equivalent exists
5. **Extensible:** Many directions to grow (UI, GitHub App, analytics)

## Why This Might Not Work

1. **Commit quality varies wildly** - Some repos unusable
2. **Narrative might feel generic** - Hard to capture actual intent
3. **Niche audience** - How many people actually want this?
4. **Maintenance burden** - GitHub API changes, LLM updates
5. **Free alternatives** - Manual process works if you have time

## Next Steps (If Continuing)

**Phase 1: Validate**
- [ ] Test on 10+ diverse repos
- [ ] Get feedback from developers
- [ ] Measure: How often is output useful as-is?

**Phase 2: Enhance**
- [ ] Add LLM narrative generation
- [ ] Build simple web UI
- [ ] Add export options (PDF, HTML)

**Phase 3: Launch**
- [ ] Product Hunt / HN launch
- [ ] Docs + examples
- [ ] Pricing if validated

**Phase 4: Scale**
- [ ] GitHub App integration
- [ ] Team features
- [ ] Analytics dashboard

## Conclusion

This prototype demonstrates:
- ✅ Technical feasibility
- ✅ Clear differentiation from "just use Claude"
- ✅ Valuable preprocessing pipeline
- ✅ Multiple potential use cases

**Decision:** Worth keeping as reference for future exploration. The core idea is sound, execution would require validation and user feedback.

---

*This document captures the ideation process so we can return to it later with fresh perspective.*
