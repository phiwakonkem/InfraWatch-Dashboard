# InfraWatch Dashboard

A real-time infrastructure monitoring dashboard — tracks service health, response times, uptime percentages, and active alerts across a fleet of monitored services, auto-refreshing every 10 seconds.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?logo=typescript) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)

---

## Features

- **Live service status grid** — healthy / degraded / down states with response time and uptime %
- **Summary stats** — total services, healthy/degraded/down counts at a glance
- **Active alerts panel** — severity-tagged (info / warning / critical) alert feed
- **Auto-refresh** — polls every 10 seconds via TanStack Query's `refetchInterval`
- **Dark, ops-dashboard UI** styled with Tailwind CSS

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Data fetching | TanStack Query |
| HTTP client | Axios |
| Styling | Tailwind CSS 4 |

## ⚠️ Backend Required

This repository contains the **frontend only**. It expects a REST API running at:

```
http://localhost:8090/api
```

with these endpoints:

| Method | Endpoint | Returns |
|---|---|---|
| `GET` | `/services` | Array of `Service` objects |
| `GET` | `/alerts` | Array of `Alert` objects |

```ts
interface Service {
  id: string
  name: string
  url: string
  status: 'healthy' | 'degraded' | 'down'
  response_time_ms: number
  uptime_percent: number
  last_checked: string
}

interface Alert {
  id: string
  service_name: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  timestamp: string
  resolved: boolean
}
```

If you don't have a matching backend running, you can mock these endpoints with [json-server](https://github.com/typicode/json-server) or a small Express/Go server that returns this shape.

## Getting Started

### Prerequisites

- Node.js 20+
- A backend matching the API contract above (see [Backend Required](#-backend-required))

### 1. Clone the repository

```bash
git clone https://github.com/phiwakonkem/InfraWatch-Dashboard.git
cd InfraWatch-Dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Point the app at your backend

The API base URL (`http://localhost:8090/api`) is set inline in `src/App.tsx`. Update it if your backend runs elsewhere.

### 4. Run the development server

```bash
npm run dev
```

Visit the URL Vite prints (typically [http://localhost:5173](http://localhost:5173)).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Project Status

This is an early-stage prototype: the dashboard UI is fully built against a defined API contract, but a matching backend has not yet been published. Next steps would be building a lightweight health-check service that pings registered URLs and stores results.

## Author

**Phiwakonke Mthethwa**
Full-Stack Developer, Centurion, South Africa

- GitHub: [@phiwakonkem](https://github.com/phiwakonkem)
- LinkedIn: [phiwakonke-mthethwa](https://www.linkedin.com/in/phiwakonke-mthethwa-97aa74331)
- Email: phiwakonkem@gmail.com
