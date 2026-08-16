Blog API

A full-stack blog application built as part of The Odin Project.
The project consists of a REST API built with Node.js and Express, a PostgreSQL database accessed through Prisma, and a React frontend.

## Features

- User can register
- User authentication with JWT
- Create, edit and delete blog posts for admin users
- Publish and unpublish posts (admin)
- Add and manage comments
- Protected API routes
- Responsive React frontend
- RESTful API
- Handling Token expiration

## Technologies used

### FrontEnd

React
React Router
CSS

### Backend

Node.js
Express
Prisma
PostgreSQL
JWT


## Getting Started

### Clone the repository:

### FrontEnd

```bash
npm install
npm run dev
```

### Set up db:

npx prisma migrate dev
npx prisma generate

### Backend

```bash
npm install
npm run start
```
## Environment Variables

Backend:

```env
DATABASE_URL=
JWT_KEY=
FRONTEND_URL=
PORT=
JWT_EXPIRESIN=
```
*****Make sure that guest account is present in the database

Frontend:

```env
VITE_API_URL=
```

Admin account: pof@pof.com, Test123?

### Improvements
- Add a Guest connection that limits the action to add Comment (no edit or deletion)
