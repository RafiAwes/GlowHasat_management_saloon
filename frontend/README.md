# Zenith Salon Engine Frontend

Role-based frontend for luxury salon operations.

## Overview

Zenith Salon Engine is a React + Vite single-page application that provides dedicated experiences for:

1. Owner
2. Admin
3. Employee
4. Customer

The frontend is optimized for dashboard-driven workflows such as booking, analytics, staffing, inventory, loyalty, and salon administration.

## Tech Stack

1. React 19 + TypeScript
2. Vite 6
3. React Router 7
4. Tailwind CSS 4
5. Express (local server wrapper)

## Project Structure

1. src/App.tsx: application routes and role-based page entry points
2. src/components/pages: all role pages and feature views
3. src/components/layouts: shared dashboard layout components
4. src/context/SalonContext.tsx: shared salon/domain state
5. src/constants.tsx: navigation definitions and shared constants
6. server.ts: local express server for dev/prod static serving

## Routes

### Auth

1. /login
2. /register

### Owner

1. /owner/dashboard
2. /owner/analytics
3. /owner/staff
4. /owner/inventory

### Employee

1. /employee/schedule
2. /employee/services

### Customer

1. /customer/book
2. /customer/history
3. /customer/loyalty

### Admin

1. /admin/dashboard
2. /admin/salons
3. /admin/users

### Shared

1. /settings

Unknown paths redirect to /login.

## Local Development

Prerequisites:

1. Node.js 20+ recommended

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Type check:

```bash
npm run lint
```

## Available Scripts

1. npm run dev: starts local express + Vite middleware
2. npm run build: creates optimized frontend bundle in dist
3. npm run preview: serves built app using Vite preview
4. npm run start: runs server.ts in production mode
5. npm run lint: TypeScript no-emit check

## Environment Notes

1. The current frontend code does not require mandatory client-side environment variables.
2. If you add environment variables later, use VITE_ prefix for values accessed in browser code.

## Deploy To Vercel

This repository includes vercel.json configured for Vite SPA deployment:

1. Build command: npm run build
2. Output directory: dist
3. SPA rewrite: all routes -> /index.html

CLI deployment:

```bash
npm i -g vercel
vercel
vercel --prod
```

Dashboard deployment:

1. Import the repository into Vercel
2. Keep framework as Vite (or auto-detected)
3. Ensure build command is npm run build
4. Ensure output directory is dist

## Deploy With Docker

Docker assets included:

1. Dockerfile: multi-stage build
2. nginx.conf: static hosting + SPA fallback
3. .dockerignore: reduced context size

Build image:

```bash
docker build -t salon-frontend .
```

Run container:

```bash
docker run -d -p 8080:80 --name salon-frontend salon-frontend
```

Open application:

1. http://localhost:8080

Stop and remove container:

```bash
docker stop salon-frontend
docker rm salon-frontend
```

## Troubleshooting

1. Blank page on deep links in production:
Cause: missing SPA rewrite.
Fix: verify vercel.json rewrite or nginx try_files fallback.

2. Build issues in CI:
Cause: node version mismatch.
Fix: use Node.js 20+ and run npm ci before npm run build.

3. CSS warning about @import order:
Cause: @import not at top of CSS file.
Fix: move @import rules to the top of the stylesheet.
