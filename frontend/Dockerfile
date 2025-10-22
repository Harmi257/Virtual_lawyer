# Step 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all source files
COPY . .

# Build the app for production (output in /app/build)
RUN npm run build

# Step 2: Serve the React app with a lightweight web server (nginx)
FROM nginx:stable-alpine

# Copy built files from previous stage to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default nginx port)
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
