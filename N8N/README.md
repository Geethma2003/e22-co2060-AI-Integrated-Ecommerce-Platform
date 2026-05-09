# N8N Social Media Dashboard Module

This module is fully separate from the other project apps and runs from `N8N\frontend` and `N8N\backend`.

## Run backend

1. `cd N8N\backend`
2. `copy .env.example .env`
3. `npm install`
4. `npm run dev`

Backend runs on `http://localhost:8088`.

## Run frontend

1. Open a new terminal
2. `cd N8N\frontend`
3. `npm install`
4. `npm run dev`

Frontend runs on `http://localhost:5174`.

## Run both from one terminal

1. `cd N8N\backend`
2. `npm install`
3. `cd ..\frontend && npm install`
4. `cd ..\backend && npm run dev:all`

## Pages

- `/` social dashboard
- `/facebook`
- `/instagram`
- `/tiktok`
