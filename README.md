# Create_EC2_NodeApp

A Node.js application designed for deployment on an AWS EC2 instance. This application demonstrates how to set up a simple Node.js project and deploy it to a cloud environment.

---

## Features

- Web server using Express.js
- Integration with Git using `simple-git`
- YAML file parsing using `yamljs`
- File system operations using Node.js `fs`
- Path management using Node.js `path`

---

## Prerequisites

Ensure the following software is installed on your system:

- **Node.js** (v14 or later recommended)
- **npm** (comes with Node.js)
- **Git**
- **AWS EC2 Instance** (if deploying)

---

## Project Structure

```
Create_EC2_NodeApp/
├── index.js          # Main application file
├── package.json      # Node.js metadata file
├── .gitignore        # Ignored files
├── public/           # Static files (if any)
├── views/            # Templates (if any)
└── README.md         # Project documentation
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/HasaraDA/Create_EC2_NodeApp.git
cd Create_EC2_NodeApp
```

### 2. Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

The required packages are:

- `express`
- `body-parser`
- `simple-git`
- `yamljs`

These are listed in `package.json` and will be automatically installed.

### 3. Start the Application

Run the application locally:

```bash
node index.js
```

By default, the application runs on **http://localhost:3000**.

---

## Deployment

### Deploy to an AWS EC2 Instance

1. **Launch an EC2 Instance**:
   - Use an Amazon Linux or Ubuntu instance.
   - Ensure the instance has Node.js and npm installed.

2. **Transfer Files**:
   Copy the project files to the EC2 instance using `scp`:
   ```bash
   scp -r ./Create_EC2_NodeApp ec2-user@<EC2_PUBLIC_IP>:~/
   ```

3. **Install Dependencies on the Instance**:
   SSH into the instance and install dependencies:
   ```bash
   ssh ec2-user@<EC2_PUBLIC_IP>
   cd Create_EC2_NodeApp
   npm install
   ```

4. **Run the Application**:
   Start the app:
   ```bash
   node index.js
   ```

   Alternatively, use a process manager like `pm2` for long-running services:
   ```bash
   npm install -g pm2
   pm2 start index.js
   ```

5. **Allow Traffic to Port 3000**:
   Update your EC2 security group to allow inbound traffic to port 3000.

### Optional: Use Docker for Deployment

If you prefer to containerize the application, follow these steps:

1. Create a `Dockerfile`:
   ```dockerfile
   FROM node:14
   WORKDIR /usr/src/app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["node", "index.js"]
   ```

2. Build and Run the Docker Image:
   ```bash
   docker build -t create-ec2-nodeapp .
   docker run -p 3000:3000 create-ec2-nodeapp
   ```

3. Deploy the Docker container to your EC2 instance or any cloud platform that supports Docker.

---

## Notes

- Ensure the `node_modules` folder is added to `.gitignore` to avoid committing it to the repository.
- Test the application locally before deploying to ensure all dependencies and configurations are working correctly.

---

## License

This project is licensed under the ISC License.

---

## Author

**HasaraDA**  
GitHub: [HasaraDA](https://github.com/HasaraDA)

Feel free to contribute to the repository or raise issues if you encounter any problems.

