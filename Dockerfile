FROM node:20-alpine

# Chromium & dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    udev \
    bash

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Create app directory
WORKDIR /app

# Copy source files
COPY package.json .
COPY server.js .
COPY schema.json .

# Install dependencies (no dev)
RUN npm install --omit=dev

# Expose MCP port
EXPOSE 9555

# Launch server on container start
CMD ["node", "server.js"]
