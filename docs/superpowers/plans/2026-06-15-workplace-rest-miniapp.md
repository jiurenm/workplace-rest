# 工位小憩小程序骨架 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a WeChat native mini program skeleton for 工位小憩 with TypeScript, tab pages, model/service boundaries, component placeholders, and CloudBase function placeholders.

**Architecture:** Pages stay thin and only render placeholders. Domain types live in `models/`, frontend business access lives in `services/`, and CloudBase implementation details are hidden behind `services/cloud.ts`. Cloud functions are present as deployable placeholders for reminders and statistics.

**Tech Stack:** WeChat Mini Program, TypeScript, WXSS, WXML, WeChat CloudBase.

---

### Task 1: Project Metadata

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `project.config.json`
- Create: `sitemap.json`

- [x] **Step 1: Add package metadata**

Create `package.json` with TypeScript and mini program typings as development dependencies.

- [x] **Step 2: Add TypeScript compiler configuration**

Create `tsconfig.json` targeting modern JavaScript and WeChat Mini Program global typings.

- [x] **Step 3: Add WeChat project configuration**

Create `project.config.json` with TypeScript enabled and `miniprogramRoot` set to the repository root.

- [x] **Step 4: Add sitemap**

Create `sitemap.json` that allows all pages.

### Task 2: App Entry

**Files:**
- Create: `app.ts`
- Create: `app.json`
- Create: `app.wxss`

- [x] **Step 1: Add app bootstrap**

Create `app.ts` to initialize CloudBase and expose basic global data.

- [x] **Step 2: Add app routes and tab bar**

Create `app.json` with home, stats, settings, and profile pages.

- [x] **Step 3: Add global styles**

Create `app.wxss` with neutral tokens and safe base styles.

### Task 3: Pages and Components

**Files:**
- Create: `pages/home/index.ts`
- Create: `pages/home/index.json`
- Create: `pages/home/index.wxml`
- Create: `pages/home/index.wxss`
- Create equivalent files for `stats`, `settings`, and `profile`
- Create placeholder files for `components/countdown-ring`, `components/task-summary`, and `components/action-guide-sheet`

- [x] **Step 1: Add four tab pages**

Each page exports a minimal `Page` object and renders a concise placeholder.

- [x] **Step 2: Add placeholder components**

Each component defines typed properties where useful and a minimal WXML structure.

### Task 4: Domain and Services

**Files:**
- Create: `models/reminder.ts`
- Create: `models/settings.ts`
- Create: `models/stats.ts`
- Create: `services/cloud.ts`
- Create: `services/reminder.ts`
- Create: `services/checkin.ts`
- Create: `services/settings.ts`
- Create: `services/subscription.ts`
- Create: `utils/time.ts`

- [x] **Step 1: Add domain models**

Define reminder task types, user settings, and daily statistics.

- [x] **Step 2: Add service stubs**

Create async service functions with clear method names and placeholder return values.

- [x] **Step 3: Add time utility**

Create small helpers for formatting dates and minutes.

### Task 5: Cloud Functions

**Files:**
- Create: `cloudfunctions/sendReminder/index.js`
- Create: `cloudfunctions/sendReminder/package.json`
- Create: `cloudfunctions/aggregateStats/index.js`
- Create: `cloudfunctions/aggregateStats/package.json`

- [x] **Step 1: Add reminder function placeholder**

Create a CloudBase function shell for future subscription-message dispatch.

- [x] **Step 2: Add stats function placeholder**

Create a CloudBase function shell for future daily aggregation.

### Verification

- [x] **Step 1: List project files**

Run `Get-ChildItem -Recurse -File` to confirm expected files exist.

- [ ] **Step 2: Type-check when dependencies are installed**

Run `npm install` and `npm run typecheck` after deciding to install local dependencies.
