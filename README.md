# 🌐 Cloud-Native Node Mongo App

![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Docker](https://img.shields.io/badge/Container-Docker-blue)
![AWS ECR](https://img.shields.io/badge/Deployed%20to-AWS%20ECR-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A **containerized Node.js + MongoDB backend application**, built with **Express**, **Docker**, and deployed on **AWS Elastic Container Registry (ECR)** for scalable cloud hosting.  
It demonstrates end-to-end DevOps workflow — from code to container to cloud.

---

## 🚀 Features

- **Node.js + Express Backend** for handling REST API requests  
- **MongoDB Integration** with Mongoose ODM  
- **Dockerized Environment** for reproducible deployments  
- **Health Check & Robust Error Handling**  
- **Mongo Express UI** for easy database visualization  
- **AWS ECR Push** ready for container registry management  

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|-------------|
| Backend | Node.js (Express.js) |
| Database | MongoDB |
| Containerization | Docker |
| Cloud Registry | AWS ECR |
| Language | JavaScript |
| Configuration | Docker Compose |

---

## 📦 Folder Structure

```
cloud-native-node-mongo-app/
│
├── node-app/
│   ├── server.js
│   ├── package.json
│   ├── index.html
│   └── ...
│
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Setup & Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Nadeer-Ansari/Cloud-Native-Node-Mongo-App.git
cd Cloud-Native-Node-Mongo-App
```

### 2️⃣ Build & run with Docker Compose
```bash
docker-compose up --build
```

### 3️⃣ Access services
- **App:** http://localhost:3000  
- **Mongo Express:** http://localhost:8081  
- **Health Check:** http://localhost:3000/health  

---

## ☁️ Deploy to AWS ECR

### Authenticate Docker with AWS
```bash
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.eu-north-1.amazonaws.com
```

### Tag your image
```bash
docker tag my-app:1.1 <your-aws-account-id>.dkr.ecr.eu-north-1.amazonaws.com/cloud-native-node-mongo-app:latest
```

### Push to ECR
```bash
docker push <your-aws-account-id>.dkr.ecr.eu-north-1.amazonaws.com/cloud-native-node-mongo-app:latest
```

Then verify your image in the **AWS ECR Console**.

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /api/profile | Fetch user profile |
| POST | /api/update-profile | Update user profile |
| GET | /api/users | Get all users |
| GET | /health | Check app and DB status |

---

## 🧠 Learning Highlights

- Setting up Node.js server with MongoDB  
- Using Mongoose models and schema validation  
- Implementing containerized microservice workflow  
- Deploying Docker images to AWS ECR  
- Managing multi-container environments via Docker Compose  

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Nadeer Ansari**  
📍 Software Engineer | DevOps & Web Developer 
🔗 [LinkedIn](https://www.linkedin.com/in/nadeer-ansari)  
🐙 [GitHub](https://github.com/Nadeer-Ansari)
