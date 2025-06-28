# Use Node.js 18 LTS as the base image (try different base image)
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies with timeout and retry settings
RUN yarn config set network-timeout 300000 && \
    yarn config set registry https://registry.npmjs.org/ && \
    yarn install --frozen-lockfile --production --network-timeout 300000

# Copy source code
COPY . .

# Expose the port (Render will override this)
EXPOSE 4558

# Start the application
CMD ["node", "src/app.js"]