# Taskly - Task Management Application

## 🚀 Live Demo

[taskly](#) (https://taskly-d54bc.web.app)

## 📜 Description

Taskly is a powerful yet minimalistic task management application that enables users to efficiently organize their tasks. With Taskly, users can add, edit, delete, and reorder tasks through a seamless drag-and-drop interface. Changes are instantly synchronized with the backend to ensure persistence across sessions.

## ✨ Features

- 🔐 **Authentication**: Secure Firebase-based Google Sign-in.
- 📝 **Task Management**:
  - Add, edit, delete, and reorder tasks.
  - Drag-and-drop tasks between categories: `To-Do`, `In Progress`, `Done`.
  - Instantly sync changes to the database.
- 📅 **Task Details**:
  - Title (max 50 characters)
  - Description (max 200 characters)
  - Auto-generated timestamp
  - Category assignment
- 🔄 **Real-time Syncing**:
  - Uses MongoDB Change Streams/WebSockets for live updates.
  - Optimistic UI updates for smooth user experience.
- 🎨 **Modern UI**:
  - Built with React + Tailwind CSS for a sleek and responsive design.
  - Mobile-friendly drag-and-drop functionality.
- 🌙 **Bonus Features** (Optional but recommended):
  - Dark mode toggle.
  - Task due dates with visual indicators.
  - Simple activity log.

## 🛠️ Tech Stack

### Frontend:

- React (Vite.js)
- Tailwind CSS + DaisyUI
- React-Beautiful-DnD (Drag & Drop)
- React Query (Data Fetching & Caching)
- Firebase Authentication

### Backend:

- Node.js (Express.js)
- MongoDB (Mongoose for Schema Management)
- WebSockets (Real-time Updates)
