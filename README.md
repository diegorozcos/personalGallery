# 📸 Personal Gallery API

A **RESTful API** for managing personal image galleries with secure user authentication and cloud storage integration. Perfect for projects where users can upload, view, and manage their images.

---

## ✨ Features

- 🔐 **User authentication** (signup / login)
- ☁️ **Image upload to AWS S3**
- 🖼️ **Gallery management** (view, edit, delete images)
- 🛡️ **Protected endpoints** using JWT
- 📄 **MongoDB** database integration

---

## 🛠️ Technologies Used

- ⚙️ **Node.js** with Express
- 🗾 **TypeScript**
- 🍃 **MongoDB** + **Mongoose**
- 🧰 **Multer** for file uploads
- 🔐 **JWT** for authentication
- ☁️ **AWS S3** for cloud storage

---

## 🚀 Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/diegorozcos/personalGallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   S3_REGION=your_s3_region
   S3_ACCESS=your_s3_access_key
   S3_SECRET=your_s3_secret_key
   S3_BUCKET=your_s3_bucket_name
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📱 API Endpoints

### 🔐 Authentication
| Method | Route            | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/auth/signup`   | Register a new user account 📝 |
| POST   | `/auth/login`    | Login to existing account 🔑 |
| GET    | `/auth/profile`  | Get user profile 👤             |

### 🖼️ Gallery
| Method | Route             | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/gallery`        | Get all images for the user 📷     |
| GET    | `/gallery/:id`    | Get a specific image by ID 🔍      |
| PUT    | `/gallery/:id`    | Update image details 📝           |
| DELETE | `/gallery/:id`    | Delete an image 🗑️              |

### 📄 Upload
| Method | Route       | Description                                        |
|--------|-------------|----------------------------------------------------|
| POST   | `/upload`   | Upload a new image (requires login) ⬆️         |

---

## 🗃️ File Upload Requirements

- 📁 Supported formats: `.jpg`, `.png`
- 🔐 Authentication is required for all actions
- ☁️ Files are stored in **AWS S3**

---

## 👨‍💼 Development

- Start with hot-reloading:
  ```bash
  npm run dev
  ```

- Build the project:
  ```bash
  npm run build
  ```

---

## 📨 Contributing

Pull requests and feedback are welcome! 💡✨  
Help improve this API or use it as a base for your own projects! 🚀