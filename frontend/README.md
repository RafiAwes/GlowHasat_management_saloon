<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/70cf415d-2b2c-42ec-942f-6eec971e4e55

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy To Vercel

This project is configured as a Vite SPA and includes [vercel.json](vercel.json) with:

1. Build command: `npm run build`
2. Output directory: `dist`
3. SPA route rewrites to `index.html`

Deploy steps:

1. Install Vercel CLI:
   `npm i -g vercel`
2. From this folder, run:
   `vercel`
3. For production deployment:
   `vercel --prod`

You can also import this Git repository directly in the Vercel dashboard and it will use [vercel.json](vercel.json) automatically.

## Deploy With Docker

This project includes:

1. [Dockerfile](Dockerfile): multi-stage build (Node build + Nginx runtime)
2. [nginx.conf](nginx.conf): SPA fallback configuration
3. [.dockerignore](.dockerignore): keeps image context clean

Build and run locally:

1. Build image:
   `docker build -t salon-frontend .`
2. Run container:
   `docker run -d -p 8080:80 --name salon-frontend salon-frontend`
3. Open app:
   `http://localhost:8080`

Stop and remove container:

1. Stop:
   `docker stop salon-frontend`
2. Remove:
   `docker rm salon-frontend`
