[← Getting Started](getting-started.md) · [Back to README](../README.md) · [Core Skills →](skills.md)

# Development Workflow

FLZ provides a set of **workflow skills** that form the core development loop: plan, improve, implement, fix, evolve. Each skill is a step in the pipeline — they connect to each other and share context through plan files and patches.

![workflow](https://github.com/lee-to/flz/raw/main/art/workflow.png)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AI FACTORY WORKFLOW                             │
└─────────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐      ┌──────────────┐      ┌──────────────────────────┐
  │              │      │    claude    │      │                          │
  │ flz   │ ───▶ │ (or any AI   │ ───▶ │      /flz         │
  │    init      │      │    agent)    │      │   (setup context)        │
  │              │      │              │      │                          │
  └──────────────┘      └──────────────┘      └────────────┬─────────────┘
                                                           │
                          ┌────────────────────────────────┼────────────────┐
                          │                                │                │
                          ▼                                ▼                ▼
               ┌──────────────────┐            ┌─────────────────┐  ┌──────────────┐
               │                  │            │                 │  │              │
               │ /flz.task │            │/flz.     │  │/flz.  │
               │                  │            │    feature      │  │    fix       │
               │  Small tasks     │            │                 │  │              │
               │  No git branch   │            │ Full features   │  │ Bug fixes    │
               │  Quick work      │            │ Git branch      │  │ Optional plan│
               │                  │            │ Full plan       │  │ With logging │
               └────────┬─────────┘            └────────┬────────┘  └───────┬──────┘
                        │                               │                   │
                        │                               │                   ▼
                        │                               │          ┌──────────────────┐
                        │                               │          │ .flz/     │
                        │                               │          │   patches/       │
                        │                               │          │ Self-improvement │
                        └───────────────┬───────────────┘          └────────┬─────────┘
                                        │                                   │
                                        ▼                                   │
                             ┌─────────────────────┐                        │
                             │                     │                        │
                             │ /flz.improve │                        │
                             │    (optional)       │                        │
                             │                     │                        │
                             │ Refine plan with    │                        │
                             │ deeper analysis     │                        │
                             │                     │                        │
                             └──────────┬──────────┘                        │
                                        │                                   │
                                        ▼                                   │
                             ┌──────────────────────┐                       │
                             │                      │◀── reads patches ─────┘
                             │ /flz.implement│
                             │ ──── error?          │
                             │  ──▶ /flz.fix │
                             │  Execute tasks       │
                             │  Commit checkpoints  │
                             │                      │
                             └──────────┬───────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │                      │
                             │ /flz.verify   │
                             │    (optional)        │
                             │                      │
                             │ Check completeness   │
                             │ Build / test / lint   │
                             │    ↓                 │
                             │ → /security-checklist│
                             │ → /review            │
                             │                      │
                             └──────────┬───────────┘
                                        │
                                        ▼
                             ┌─────────────────────┐
                             │                     │
                             │ /flz.commit  │
                             │                     │
                             └──────────┬──────────┘
                                        │
                        ┌───────────────┴───────────────┐
                        │                               │
                        ▼                               ▼
                   More work?                        Done!
                   Loop back ↑                          │
                                                        ▼
                                             ┌─────────────────────┐
                                             │                     │
                                             │ /flz.evolve  │
                                             │                     │
                                             │ Reads patches +     │
                                             │ project context     │
                                             │       ↓             │
                                             │ Improves skills     │
                                             │                     │
                                             └─────────────────────┘

```

## When to Use What?

| Command | Use Case | Creates Branch? | Creates Plan? |
|---------|----------|-----------------|---------------|
| `/flz.task` | Small tasks, quick fixes, experiments | No | `.flz/PLAN.md` |
| `/flz.feature` | Full features, stories, epics | Yes | `.flz/features/<branch>.md` |
| `/flz.feature --parallel` | Concurrent features via worktrees | Yes + worktree | User runs `/flz.task` in worktree |
| `/flz.improve` | Refine plan before implementation | No | No (improves existing) |
| `/flz.fix` | Bug fixes, errors, hotfixes | No | Optional (`.flz/FIX_PLAN.md`) |
| `/flz.verify` | Post-implementation quality check | No | No (reads existing) |

## Workflow Skills

These skills form the development pipeline. Each one feeds into the next.

### `/flz.feature <description>` — start a feature

```
/flz.feature Add user authentication with OAuth
```

Creates a git branch, asks about testing/logging/docs preferences, builds a plan file, and invokes `/flz.task` to break it into steps. For parallel work on multiple features, use `--parallel` to create isolated worktrees.

### `/flz.task <description>` — plan the work

```
/flz.task Add product search API
```

Analyzes requirements, explores your codebase for patterns, creates tasks with dependencies, and saves the plan to `.flz/PLAN.md`. For 5+ tasks, includes commit checkpoints.

### `/flz.improve [prompt]` — refine the plan

```
/flz.improve
/flz.improve add validation and error handling
```

Second-pass analysis. Finds missing tasks (migrations, configs, middleware), fixes dependencies, removes redundant work. Shows a diff-like report before applying changes.

### `/flz.implement` — execute the plan

```
/flz.implement        # Continue from where you left off
/flz.implement 5      # Start from task #5
/flz.implement status # Check progress
```

Reads past patches from `.flz/patches/` to learn from previous mistakes, then executes tasks one by one with commit checkpoints. If the plan has `Docs: yes`, runs `/flz.docs` after completion.

### `/flz.verify [--strict]` — check completeness

```
/flz.verify          # Verify implementation against plan
/flz.verify --strict # Strict mode — zero tolerance for gaps
```

Optional step after `/flz.implement`. Goes through every task in the plan and verifies the code actually implements it. Checks build, tests, lint, looks for leftover TODOs, undocumented env vars, and plan-vs-code drift. Offers to fix any gaps found. At the end, suggests running `/flz.security-checklist` and `/flz.review`. Use `--strict` before merging to main.

### `/flz.fix [bug description]` — fix and learn

```
/flz.fix TypeError: Cannot read property 'name' of undefined
```

Two modes — choose when you invoke:
- **Fix now** — investigates and fixes immediately with logging
- **Plan first** — creates `.flz/FIX_PLAN.md` with analysis and fix steps, then stops for review

When a plan exists, run without arguments to execute:
```
/flz.fix    # reads FIX_PLAN.md → applies fix → deletes plan
```

Every fix creates a **self-improvement patch** in `.flz/patches/`. Every patch makes future `/flz.implement` and `/flz.fix` smarter.

### `/flz.evolve` — improve skills from experience

```
/flz.evolve          # Evolve all skills
/flz.evolve fix      # Evolve only the fix skill
```

Reads all accumulated patches, analyzes project patterns, and proposes targeted skill improvements. Closes the learning loop: **fix → patch → evolve → better skills → fewer bugs**.

---

For full details on all skills including utility commands (`/flz.docs`, `/flz.dockerize`, `/flz.build-automation`, `/flz.ci`, `/flz.commit`, `/flz.verify`, `/flz.skill-generator`, `/flz.security-checklist`), see [Core Skills](skills.md).

## Why Spec-Driven?

- **Predictable results** - AI follows a plan, not random exploration
- **Resumable sessions** - progress saved in plan files, continue anytime
- **Commit discipline** - structured commits at logical checkpoints
- **No scope creep** - AI does exactly what's in the plan, nothing more
