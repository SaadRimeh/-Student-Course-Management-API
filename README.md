
# 📚 Student & Course Management API

This is a RESTful API built using **Node.js**, **Express.js**, and **MongoDB** for managing student and course records. It supports CRUD operations to add, retrieve, update, and delete data.



 🚀 Overview

- Master Branch: The production-ready code is on the master branch.
- Required Environment Variables: To run the project, you'll need to create a `.env` file with the following keys:
  - MONGO_URL: Your MongoDB connection string. 🔗
  - PORT: The port number on which the server will run. (Set this to **5000**) 🔌
  - JWT_SECRET_KEY: A secret key used for authentication with JSON Web Tokens. 🔒



 🌟 Features

 👨‍🎓 Student Management
- Register a New Student: Easily add new student records. ✍️
- Retrieve All Students: Fetch a list of all registered students. 📋

 📘 Course Management
- Add a New Course: Create new course records. ➕
- Get All Courses: Retrieve a list of all courses. 📚
- Get a Course by ID: Fetch details of a specific course. 🔍
- Update Course Details: Modify information for an existing course. ✏️
- Delete a Course: Remove a course from the system. 🗑️



 🛠️ Technology Used

- Node.js: The runtime environment. ⚙️
- Express.js: The web framework for building RESTful APIs. 🌐
- MongoDB: The NoSQL database for storing records. 💾
- Mongoose: An ODM for MongoDB that simplifies data manipulation. 🔧

 

 📊 API Endpoints

| Endpoint                 | Method     | Description               |
|--------------------------|------------|--------------------------------|
| /api/students/register   | POST       | Register a new student         |
| /api/students            | GET        | Retrieve all students          |
| /api/courses             | POST       | Add a new course               |
| /api/courses             | GET        | Get all courses                |
| /api/courses/:id         | GET        | Get a course by its ID         |
| /api/courses/:id         | PUT        | Update course information      |
| /api/courses/:id         | DELETE     | Delete a course                |



 🔧 Getting Started

 1. Clone the Repository


git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


 2. Install Dependencies

npm install


 3. Configure the Environment

Create a .env file in the root directory and add the following:

env
MONGO_URL=your-mongodb-connection-string
PORT=5000
JWT_SECRET_KEY=your-secret-key


 4. Run the Application


npm start


The server will start on [http://localhost:5000](http://localhost:5000). 🌐



 🤝 Contributing

Contributions are welcome! To get started:
1. Fork the repository. 🍴
2. Create a new branch for your feature or bug fix. 🌱
3. Commit your changes. 💾
4. Open a pull request to merge your changes into the master branch. 🔀

Contact

For questions or suggestions, reach out via:

GitHub: SaadRimeh

Email: saad.rimeh.01@gimal.com




