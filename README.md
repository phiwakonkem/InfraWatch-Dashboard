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
- **React Compiler enabled** for automatic memoisation

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Data fetching | TanStack Query 5 |
| HTTP client | Axios |

## Backend

This repository is the **frontend only**. It expects a REST API at:

```
http://localhost:8090/api
```

The matching backend is published separately: **[InfraWatch-API](https://github.com/phiwakonkem/InfraWatch-API)** — Express, implementing exactly this contract (note: it currently returns static seeded data rather than performing real health-check polling).

Endpoints the dashboard consumes:

| Method | Endpoint | Returns |
|---|---|---|
| `GET` | `/services` | Array of `Service` objects |
| `GET` | `/alerts` | Array of `Alert` objects |

Expected shapes:

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

Without a backend implementing these two routes, the dashboard will render with empty data. Point the `axios` base URL in `src/App.tsx` at your own monitoring API if it runs elsewhere.

## Prerequisites

- Node.js 20 or later
- npm

## Installation

```bash
# 1. Clone and run the backend
git clone https://github.com/phiwakonkem/InfraWatch-API.git
cd InfraWatch-API
npm install
npm start
# API now running at http://localhost:8090

# 2. In a separate terminal, clone and run the frontend
git clone https://github.com/phiwakonkem/InfraWatch-Dashboard.git
cd InfraWatch-Dashboard
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (Vite's default port).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
InfraWatch-Dashboard/
├── src/
│   ├── App.tsx      # Dashboard UI, data fetching, and status logic
│   ├── main.tsx
│   ├── App.css
│   └── assets/
├── public/
└── index.html
```

## Related

- Backend: **[InfraWatch-API](https://github.com/phiwakonkem/InfraWatch-API)**

## Roadmap

- [ ] Add real health-check polling to InfraWatch-API instead of static seeded data
- [ ] Add historical uptime charts per service
- [ ] Add alert acknowledgement/resolution actions from the UI

## Author

**Phiwakonke Mthethwa** — Full-Stack Developer, South Africa
[GitHub](https://github.com/phiwakonkem) · [LinkedIn](https://www.linkedin.com/in/phiwakonke-mthethwa-97aa74331) · phiwakonkem@gmail.com

## License

MIT
