FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --silent
COPY src ./src
EXPOSE 8082
CMD ["npm", "start"]

