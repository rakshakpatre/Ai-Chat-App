📘 AI Chat App
Full Stack AI Chat Application with Saved History

This project is a full-stack AI chat application built using React, Node.js/Express, and Firebase Firestore.
The user can chat with an AI assistant, and all messages are saved in Firestore so the conversation appears again even after refreshing the page.

🚀 Features
💬 Conversational AI
Users can send messages to a built-in AI assistant.
AI replies are generated from a pluggable AI engine:
Google Gemini (optional)
OpenAI (optional)
Mock AI (default – reliable, no API key needed)

🔥 Chat History Saved in Firestore
Every user message and AI response is saved in Firebase Firestore.
Messages are fetched on page load to restore the entire conversation.

🎨 Modern & Attractive UI
Gradient background with glassmorphism effects
Smooth message animations
Avatars for user & AI
Auto scroll-to-bottom
Mobile responsive
Clean input controls & interactive send button

⚙️ Backend API (Node + Express)
GET /api/history
Fetch all chat messages from Firestore.
POST /api/message
Send:
{ "message": "hello" }

Backend:
Saves message
Generates AI reply
Saves reply
Returns updated conversation list

🏗️ Tech Stack
Frontend
React (Vite)
Axios
Custom CSS UI

Backend
Node.js + Express
Firebase Admin SDK

Database
Firebase Firestore

AI Engine
Located in:
backend/config/aiClient.js

Supports:
Google Gemini API
OpenAI API
Mock AI (default)

📁 Project Structure
ai-chat-app/
│
├── backend/
│   ├── config/
│   │   ├── firebase.js
│   │   ├── aiClient.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatWindow.jsx
    │   │   ├── MessageList.jsx
    │   │   ├── MessageInput.jsx
    │   ├── services/
    │   │   ├── api.js
    │   ├── App.jsx
    │   ├── App.css
    ├── package.json