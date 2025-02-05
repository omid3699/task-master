# 📝 Task Master System

A modern, full-stack **Task Management System** built with **Django** (backend) and **React** (frontend). It provides a robust and scalable solution for managing tasks efficiently.

## 🚀 Features

✅ User authentication (sign up, login, logout)  
✅ Task creation, updating, and deletion  
✅ Assign tasks to users  
✅ Task status tracking (Pending, In Progress, Completed)  
✅ Responsive UI with React & TailwindCSS  
✅ RESTful API with Django REST Framework  

---

## 🏗️ Project Structure

```
├── apps/               # Django apps directory
├── config/             # Django project settings
├── db.sqlite3          # SQLite database (for development only)
├── frontend/           # React application
├── Makefile            # Helper commands
├── manage.py           # Django management script
└── requirements.txt    # Python dependencies
```

---

## 🛠️ Installation & Setup

### 1️⃣ Prerequisites

Make sure you have the following installed:
- nodejs and npm
- python and pip
- virtualenv # optional



### 2️⃣ Clone the Repository

```sh
git clone https://github.com/omid3699/task-master.git
cd task-master
```

### 3️⃣ Run Backend Locally

```sh
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 4️⃣ Run Frontend Locally

```sh
cd frontend
npm install
npm run dev
```

---

## 🚀 TODO

- [ ] Add Docker support for deployment
- [ ] Implement an email reminder feature for tasks

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ⭐ Contribute

Feel free to fork, submit PRs, or open issues! Let's build something awesome together. 😊

### 📩 Contact

For questions or feedback, reach out via **<omedmm3@email.com>** or [GitHub Issues](https://github.com/omid3699/task-master/issues).
