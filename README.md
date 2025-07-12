# Skill Swap Platform

> A MERN-based web application built by **Team CodeCrushers** for empowering peer-to-peer skill exchange in real time.

---

## 🌟 Overview

**Skill Swap Platform** is a mini full-stack web application where users can list the skills they offer and request skills they want in return. The platform fosters collaborative growth by allowing users to connect, exchange knowledge, and build a learning network through skill swapping.

---

## 🔧 Features

### 👤 User Features
- **Profile Creation**:
  - Name (required)
  - Location (optional)
  - Profile photo (optional)
- **Skill Listings**:
  - Skills offered
  - Skills wanted
  - Availability (e.g., weekends, evenings)
- **Privacy Settings**:
  - Choose to make the profile public or private.
- **Discovery**:
  - Browse or search other users by skill (e.g., “Photoshop”, “Excel”)
- **Swap Requests**:
  - Send and receive swap requests
  - Accept or reject incoming swap offers
  - View current, pending, or past swaps
  - Delete unaccepted swap requests
- **Feedback & Ratings**:
  - Leave feedback after swaps for quality assurance

---

### 🛡️ Admin Features
- Monitor all user activities and swaps
- **Moderation Tools**:
  - Reject inappropriate or spammy skill descriptions
  - Ban users violating platform policies
- **Communication Tools**:
  - Send platform-wide announcements (e.g., feature rollouts, downtime notices)
- **Analytics & Reports**:
  - Download reports for:
    - User activity
    - Feedback logs
    - Swap statistics

---

## 🛠️ Tech Stack

**Frontend**:  
- React.js  
- Tailwind CSS  
- TypeScript (optional)

**Backend**:  
- Node.js  
- Express.js  
- MongoDB + Mongoose

**Dev Tools**:  
- Git & GitHub  
- Postman  
- Vercel / Netlify (for deployment)

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js & npm
- MongoDB

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/skill-swap-platform.git
cd skill-swap-platform

# Install frontend and backend dependencies
cd frontend
npm install
cd ../backend
npm install

