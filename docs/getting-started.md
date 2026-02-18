[← Back to README](../README.md) · Next: [Development Workflow →](workflow.md)

# Getting Started

## What is FLZ?

FLZ is a CLI tool and skill system that:

1. **Analyzes your project** — detects tech stack from package.json, composer.json, requirements.txt, etc.
2. **Installs relevant skills** — downloads from [skills.sh](https://skills.sh) or generates custom ones
3. **Configures MCP servers** — GitHub, Postgres, Filesystem based on your needs
4. **Provides spec-driven workflow** — structured feature development with plans, tasks, and commits

## Supported Agents

FLZ works with any AI coding agent. During `flz init`, you choose your target agent and skills are installed to the correct directory with paths adapted automatically:

| Agent | Config Directory | Skills Directory |
|-------|-----------------|-----------------|
| Claude Code | `.claude/` | `.claude/skills/` |
| Cursor | `.cursor/` | `.cursor/skills/` |
| Windsurf | `.windsurf/` | `.windsurf/skills/` |
| Roo Code | `.roo/` | `.roo/skills/` |
| Kilo Code | `.kilocode/` | `.kilocode/skills/` |
| Antigravity | `.agent/` | `.agent/skills/`, `.agent/workflows/` |
| OpenCode | `.opencode/` | `.opencode/skills/` |
| Warp | `.warp/` | `.warp/skills/` |
| Zencoder | `.zencoder/` | `.zencoder/skills/` |
| Codex CLI | `.codex/` | `.codex/skills/` |
| GitHub Copilot | `.github/` | `.github/skills/` |
| Gemini CLI | `.gemini/` | `.gemini/skills/` |
| Junie | `.junie/` | `.junie/skills/` |
| Universal / Other | `.agents/` | `.agents/skills/` |

MCP server configuration is supported for Claude Code, Cursor, Roo Code, Kilo Code, and OpenCode. Other agents get skills installed with correct paths but without MCP auto-configuration.

## Your First Project

```bash
# 1. Install FLZ
npm install -g flz

# 2. Go to your project
cd my-project

# 3. Initialize — picks your agent, detects stack, installs skills
flz init

# 4. Open your AI agent (Claude Code, Cursor, etc.) and run:
/flz

# 5. Start building
/flz.feature Add user authentication with OAuth
```

From here, FLZ creates a branch, builds a plan, and you run `/flz.implement` to execute it step by step.

## CLI Commands

```bash
# Initialize project
flz init

# Update skills to latest version
flz update
```

## Next Steps

- [Development Workflow](workflow.md) — understand the full flow from plan to commit
- [Core Skills](skills.md) — all available slash commands
- [Configuration](configuration.md) — customize `.flz.json` and MCP servers
