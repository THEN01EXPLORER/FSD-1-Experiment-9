# Stage 1: Build the React Application
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application using NGINX
FROM nginx:alpine

# Copy custom Nginx configuration if you have one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the build stage into the NGINX html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
