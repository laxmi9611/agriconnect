# 🌾 AgriConnect — Smart Farming Platform

A full-stack platform connecting farmers, buyers, and agricultural experts — with weather data, crop recommendations, marketplace, and community features.

[![Live Demo](https://img.shields.io/badge/Live-Demo-coming_soon-lightgrey?style=for-the-badge)](#)
[![Backend](https://img.shields.io/badge/API-coming_soon-lightgrey?style=for-the-badge)](#)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-black?style=for-the-badge&logo=github)](https://github.com/laxmi9611/agriconnect)

---

## 📖 About

AgriConnect is a full-stack farming platform that helps farmers:
- Check **real-time weather** for their location
- Get **crop recommendations** based on season and soil
- Buy/sell produce on a **peer-to-peer marketplace**
- Ask questions in a **farmer community forum**
- Track **mandi (market) prices**

Built using the **MERN stack** with **OpenWeatherMap API**, **Leaflet maps**, and **Cloudinary image uploads**.

---

## ✨ Features

### 🌱 Farmer Dashboard
- Real-time weather forecast (7-day)
- Crop recommendations
- Disease detection (upload leaf photo)
- Market prices tracker
- Farming tips by season

### 🛒 Marketplace
- Farmers list produce with photos
- Buyers browse & search
- Filter by category, location, price
- Contact seller directly
- Verified farmer badges

### 💬 Community Forum
- Post questions
- Answer & upvote
- Categories (pests, irrigation, seeds, etc.)
- Search discussions

### 👤 User Features
- JWT authentication
- Role-based access (farmer/buyer/admin)
- Profile with avatar (Cloudinary)
- My listings
- My posts
- Notifications

### 👑 Admin Panel
- Dashboard with stats
- Verify farmers
- Moderate listings
- Manage categories

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 + Vite | UI framework |
| React Router DOM | Routing |
| Context API | Global state |
| Axios | HTTP client |
| Leaflet | Maps |
| Recharts | Charts |
| React Toastify | Notifications |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | Server |
| MongoDB + Mongoose | Database |
| JWT + bcryptjs | Auth |
| Cloudinary | Image storage |
| Multer | File uploads |
| Axios | External API calls |
| dotenv + CORS | Config |

### External APIs
| API | Purpose | Free |
|-----|---------|------|
| OpenWeatherMap | Weather data | ✅ 1000 calls/day |
| OpenStreetMap (Leaflet) | Maps | ✅ 100% free |

### DevOps
| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Database |
| Render.com | Backend hosting |
| Vercel | Frontend hosting |
| Cloudinary | Image CDN |

---

## 📁 Project Structure