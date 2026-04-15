# Experiment 9: Containerization, CI/CD, and AWS Deployment

This repository demonstrates the completion of Experiment 9:
* **3.2.1** Containerized React application using Docker multi-stage builds.
* **3.2.2** Automated CI/CD pipeline for React applications using GitHub Actions.
* **3.2.3** **Totally Free Tier** AWS deployment (Single Instance).

## 1. Local Development with Docker (Multi-Stage Builds)
The frontend application uses a **Multi-Stage Dockerfile** (`frontend/Dockerfile`) to:
1. Build the React application with a Node.js image.
2. Serve the built static assets efficiently via an NGINX image.

The backend uses a production-optimized Node.js Dockerfile (`backend/Dockerfile`).

To spin up the full stack locally:
```bash
docker compose up --build
```
- **Frontend** is accessible at `http://localhost/` (Proxies requests to `/api/*` automatically)
- **Backend API** is accessible at `http://localhost:5000/`

## 2. CI/CD Pipeline (GitHub Actions)
The repository includes an automated pipeline configured in `.github/workflows/ci.yml`.
On every `push` or `pull_request` to the `main` branch, the pipeline will:
- Checkout source code.
- Setup Node.js environments.
- Install dependencies for both frontend and backend.
- Lint and build the frontend React application.
- Build the Docker containers for the entire stack to verify deployment readiness.

## 3. AWS Deployment Setup (Totally Free Tier)
The `aws/infrastructure.yaml` provides a CloudFormation template that provisions:
- A single **t2.micro** EC2 instance (within the AWS Free Tier).
- Modern **Amazon Linux 2023** OS for best performance and security.
- Security Groups allowing direct HTTP access to your containerized app.

### How to deploy on AWS:

I've provided automation scripts to make deployment as easy as possible:

1. **Environment Setup**: Run the tool installer to ensure you have the AWS CLI:
   ```powershell
   ./install_tools.ps1
   ```
2. **Infrastructure Discovery & Deployment**: Run the automated deployment script. It will automatically find your Default VPC and Subnets and launch the CloudFormation stack:
   ```powershell
   # First configure your AWS credentials
   aws configure
   
   # Then run the automated deploy
   ./deploy.ps1
   ```
3. **Access**: Once the command finishes, it will print your **LoadBalancerDNS**. Open that URL in your browser!
