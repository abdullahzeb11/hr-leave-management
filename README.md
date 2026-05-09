# Leavely · HR Leave Management

A modern, responsive HR Leave Management dashboard built with **React 18**, **Vite**, and **Tailwind CSS**. Supports **English + Arabic (RTL)**, role-based views for employees and managers, and a clean, enterprise-grade UI.

## Features

- Employee login (sample accounts below)
- Submit a new leave request with live summary
- Manager approval / rejection flow with optional note
- Dashboard stats: balances, pending requests, team availability
- Team page (manager view) and shared monthly calendar
- Fully responsive, mobile drawer navigation
- Bilingual EN / AR with automatic RTL flip

## Tech

- React 18 + Vite 6
- Tailwind CSS 3
- Pure inline SVG icon set (no icon dependency)
- Local component composition, no UI framework lock-in

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the build
```

## Demo accounts

Password for both is `demo`.

| Role     | Email                  |
| -------- | ---------------------- |
| Employee | `layla@leavely.io`     |
| Manager  | `noura@leavely.io`     |

Switch language with the globe button in the top bar.

## Deploy to Netlify

The repo ships with a `netlify.toml` configured for Vite:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/* → /index.html` (200)

Connect the GitHub repo on [app.netlify.com](https://app.netlify.com) — no extra configuration needed.

## Project structure

```
src/
├── components/
│   ├── ui/            Reusable UI primitives (Button, Card, Badge, Input, Modal, Avatar, Icons, Toast)
│   ├── layout/        Sidebar, Topbar, AppLayout
│   ├── dashboard/     StatCard, BalanceBars
│   └── leave/         LeaveTable, LeaveRequestForm
├── contexts/          AppContext (auth, lang, requests, routing)
├── data/              sampleData.js (users, requests, leave types)
├── i18n/              translations.js (EN + AR)
├── pages/             Login, Dashboard, MyLeaves, NewRequest, Approvals, Team, Calendar
├── App.jsx            Top-level router
├── main.jsx           React entry
└── index.css          Tailwind layers + base styles
```
