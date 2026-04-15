# Experiment 9: Containerization, CI/CD, and AWS Deployment

This repository demonstrates the completion of Experiment 9:
* **3.2.1** Containerized React application using Docker multi-stage builds.
* **3.2.2** Automated CI/CD pipeline for React applications using GitHub Actions.
* **3.2.3** AWS full-stack deployment with load balancing and auto-scaling.

## 1. Local Development with Docker (Multi-Stage Builds)
The frontend application uses a **Multi-Stage Dockerfile** (`frontend/Dockerfile`) to:
1. Build the React application with a Node.js image.
2. Serve the built static assets efficiently via an NGINX image.

The backend uses a production-optimized Node.js Dockerfile (`backend/Dockerfile`).

To spin up the full stack locally:
```bash
docker-compose up --build
```
- **Frontend** is accessible at `http://localhost/`
- **Backend API** is accessible at `http://localhost:5000/`

## 2. CI/CD Pipeline (GitHub Actions)
The repository includes an automated pipeline configured in `.github/workflows/ci.yml`.
On every `push` or `pull_request` to the `main` branch, the pipeline will:
- Checkout source code.
- Setup Node.js environments.
- Install dependencies for both frontend and backend.
- Lint and build the frontend React application.
- Build the Docker containers for the entire stack to verify deployment readiness.

## 3. AWS Deployment Setup (Load Balancing and Auto-Scaling)
The `aws/infrastructure.yaml` provides an AWS CloudFormation template that provisions:
- An **Application Load Balancer (ALB)** to distribute incoming traffic.
- An **Auto Scaling Group (ASG)** configured to maintain 2 to 5 instances, scaling based on Average CPU Utilization.
- Security Groups allowing appropriate traffic.

### How to deploy on AWS:
1. Ensure you have the AWS CLI configured with proper IAM credentials.
2. Run the following command to deploy the CloudFormation stack:
```bash
aws cloudformation create-stack \
  --stack-name Exp9FullStack \
  --template-body file://aws/infrastructure.yaml \
  --parameters ParameterKey=VpcId,ParameterValue=<YOUR_VPC_ID> ParameterKey=Subnets,ParameterValue=\"<SUBNET_1>,<SUBNET_2>\"
```
3. Once the stack finishes creation, it outputs the `LoadBalancerDNS`, which you can use to access the highly-available deployed application.
