# AGENTS.md

This file provides guidance to coding agents when working with code in this
repository.

## What This Is

A scaffolded template used to build Slack apps with the Deno Slack SDK and the
Slack CLI.

## Slack Plugin

To install the Slack plugin for your coding agent, follow
[Claude Code, Codex, Cursor, and Other Coding Agents](./README.md#claude-code-codex-cursor-and-other-coding-agents)
in the README.

## Slack Skills

Slack skills are pre-installed in `.agents/skills` (and `.claude/skills` for
Claude Code). Use them for Slack work. If the Slack plugin is installed, prefer
its `slack:` skills, such as `slack:block-kit`, which may be newer.

## Before you finish

Run `deno task test` (format check, lint, and tests) and type-check with
`deno check`. CI runs both on every PR.

## Code Style

- Snake-case filenames
- No code comments. Make the code explain itself with clear names, tests, or
  types. Put the reason for a change in the PR description.
