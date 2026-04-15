# Use the official Node.js Alpine image for a smaller footprint
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Expose the API port
EXPOSE 5000

# Start the Node.js application
CMD ["npm", "start"]
