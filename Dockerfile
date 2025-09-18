# Etapa 1: Build da aplicação
FROM node:18-alpine AS build

WORKDIR /app

# Copiar dependências primeiro (para cache eficiente)
COPY package*.json ./

# Instalar dependências
RUN npm ci --legacy-peer-deps

# Copiar o resto do código
COPY . .

# Variáveis opcionais (se tiver .env)
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL

# Rodar build
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
