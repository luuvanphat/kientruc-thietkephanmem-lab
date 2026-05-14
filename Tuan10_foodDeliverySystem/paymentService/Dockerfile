FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --silent
COPY src ./src
COPY shared ./shared
EXPOSE 8084
CMD ["npm", "start"]

