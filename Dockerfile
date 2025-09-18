# Etapa 1: Build da aplicação
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir os arquivos com Nginx
FROM nginx:alpine

# Remove o nginx.conf padrão e adiciona um customizado
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Copia os arquivos buildados do Vite para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
