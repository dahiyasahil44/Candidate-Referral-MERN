Candidate Referral Management System (MERN)

A full-stack MERN application that allows HR teams to refer candidates, upload resumes, update hiring status, and view metrics.

Built with:

React + Vite (Frontend)

Tailwind CSS

Node.js + Express (Backend)

MongoDB Atlas

Render (Backend Hosting)

Vercel (Frontend Hosting)

🚀 Live Demo
Service	URL
Frontend (Vercel)	https://candidate-referral-mern.vercel.app

Backend (Render)	https://candidate-referral-mern.onrender.com

API Base URL	https://candidate-referral-mern.onrender.com/api
📁 Project Structure
project/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   └── App.jsx
│   └── index.html
│
└── server/               # Express backend
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── models/
    ├── uploads/         # Stored resumes (Render persistent disk)
    ├── server.js
    ├── package.json
    └── .env (local only)

✨ Features
📝 Candidate Management

Add candidates with name, email, phone, job title

Upload PDF resumes

Delete candidates

View, search, and filter by status

Update candidate status:
Pending → Reviewed → Hired

📊 Metrics Dashboard

Total candidates

Pending

Reviewed

Hired

🎨 UI/UX

Responsive Tailwind CSS

Clean card layouts

Stylish forms

Dashboard layout

🔌 Backend API

REST-based Express API

MongoDB Atlas

Multer PDF upload

CORS configured for Vercel

🛠️ Local Development Setup
🔧 Backend Setup (/server)
cd server
npm install


Create .env file:

PORT=5000
MONGO_URI=your-mongodb-atlas-uri
UPLOAD_DIR=uploads
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret


Start server:

node server.js

💻 Frontend Setup (/client)
cd client
npm install


Create .env file:

VITE_API_URL=http://localhost:5000/api


Run dev server:

npm run dev

🌍 Deployment Guide
🟦 Backend Deployment (Render)

Push repo to GitHub

Go to https://render.com

New → Web Service

Set Root Directory: server/

Set Build Command:

npm install


Set Start Command:

node server.js


Add environment variables:

PORT=10000
MONGO_URI=your-mongo-atlas-uri
UPLOAD_DIR=uploads
FRONTEND_URL=https://candidate-referral-mern.vercel.app


Create Persistent Disk:

Name: uploads

Mount Path: /server/uploads

Size: 1GB

Backend URL example:

https://candidate-referral-mern.onrender.com/api

🟧 Frontend Deployment (Vercel)

Go to https://vercel.com

Import GitHub repo

Set Root Directory: client/

Add environment variable:

VITE_API_URL=https://candidate-referral-mern.onrender.com/api


Set build configuration:

Build Command:

npm run build


Output Directory:

dist

🔗 API Endpoints
➤ Create Candidate

POST /api/candidates
Body: multipart/form-data

➤ Get All Candidates

GET /api/candidates

➤ Update Status

PUT /api/candidates/:id/status

➤ Delete

DELETE /api/candidates/:id

➤ Metrics

GET /api/candidates/metrics/all

🔐 CORS Configuration (Backend)

server.js:

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


👨‍💻 Author

Sahil Dahiya
Candidate Referral MERN System