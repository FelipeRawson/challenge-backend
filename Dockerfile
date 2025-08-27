FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build || true
EXPOSE 3001
CMD ["npm", "run", "dev"]