FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
