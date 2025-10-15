# Use a lightweight Node.js base image
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json & package-lock.json from current folder
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all other source files from current folder
COPY . .

# Set environment variables (can be overridden later)
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password \
    MONGO_DB_HOST=mongodb \
    MONGO_DB_NAME=user-account

EXPOSE 3000

CMD ["node", "server.js"]
