# Innofashion Frontend

Innofashion Frontend is the Next.js web client for an event, competition, registration, evaluation, and attendance management system.

## Overview

The frontend provides the public site, participant workflows, user dashboard, QR attendance features, and admin interfaces for the Innofashion platform. It communicates with a Laravel backend API and uses modern React tooling for client-side state, data fetching, animations, and QR workflows.

## Key Features

- Public landing pages for events and competitions.
- Participant registration and profile completion flows.
- Draft and submission flows for event and competition registration.
- Payment proof and document upload handling through backend APIs.
- User dashboard for registration status and event information.
- QR code generation and scanner support for attendance workflows.
- Admin dashboard for events, competitions, users, registration validation, attendance, and exports.
- Evaluation form builder/response interfaces connected to backend evaluation APIs.
- Role-aware admin routes and protected pages.
- API proxy routes to simplify communication with the backend.

## Tech Stack

- Framework: Next.js 16
- UI: React 19, TypeScript
- Styling: Tailwind CSS 4
- Auth/session: NextAuth
- Data fetching: TanStack React Query
- QR: qrcode.react, @yudiel/react-qr-scanner
- Charts: Chart.js, react-chartjs-2
- Animation/visuals: Framer Motion, GSAP, Three.js, React Three Fiber
- Alerts: SweetAlert2

## Project Structure

```text
app/                    Next.js App Router pages and route handlers
components/             Shared UI and domain components
lib/                    API clients, auth helpers, and utilities
public/                 Static assets
next.config.ts          Next.js configuration
```

## Getting Started

```bash
npm install
npm run dev
```

Configure the backend API URL before running real workflows:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## Backend Dependency

Most workflows require the Innofashion Laravel backend to be running and reachable through `NEXT_PUBLIC_API_URL`.

## Security Notes

- Keep NextAuth secrets out of source control.
- Do not expose backend admin tokens to the browser.
- Validate file uploads on the backend even if the frontend performs client-side checks.
- Attendance QR flows should expire or rotate codes to reduce replay risk.

## Status

Frontend application for a full-stack event and competition management system.
