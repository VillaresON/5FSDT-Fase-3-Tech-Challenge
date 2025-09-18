# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Instalar pacotes nativos (caso alguma lib precise compilar)
RUN apk add --no-cache python3 make g++

# Copiar dependências primeiro
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copiar código
COPY . .

# Rodar build do Vite
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
