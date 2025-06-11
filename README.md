
# 📝 Task Manager App

A modern and responsive Task Management web application built with **React + Vite** for the frontend and **Spring Boot** as the backend API.

---

## 🚀 Features

- 📌 Create, update, and delete tasks
- ✅ Mark tasks as completed or pending
- 🔍 Search and filter tasks by title, priority, or status
- 🎯 Clear filters with one click to return to full task list
- 🎨 Clean, colorful, and rounded iOS-inspired UI
- 🔗 GitHub profile icon linked in navbar
- 🔄 Fully connected with Spring Boot backend using Axios

---

## 🧱 Task Model

Each task has the following fields:

- `id` – Unique identifier
- `title` – Task title (string)
- `description` – Detailed info (string)
- `createdDate` – Date/time task was created
- `completed` – Boolean flag for completion
- `priority` – Numeric level (1 to 10)

---

## 📦 Tech Stack

### Frontend:
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- CSS (custom + optional utility-first like TailwindCSS)

### Backend:
- [Spring Boot](https://spring.io/projects/spring-boot)
- [JPA + Hibernate](https://hibernate.org/)
- [PostgreSQL / H2 / MySQL] (depending on config)

🔗 **Backend Repository:**
[👉 View Spring Boot Backend Code](https://github.com/Balaji01-4D/task-manager-backend)

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Dev Server

```bash
npm run dev
```

### 4. Connect to Backend

Make sure your Spring Boot backend is running on `http://localhost:8080`
Or update the Axios base URL accordingly in your service files.

---

## 🙋 Author

* [Balaji](https://github.com/Balaji01-4D)
