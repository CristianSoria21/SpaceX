# 1: Build de la app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

#2: Cargar la app con un servidor estático
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
