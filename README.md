
# 📚 [FrontEnd] Plataforma de Aulas para Professores e Alunos

Plataforma onde professores podem postar suas aulas e transmitir conhecimento de forma prática, centralizada e tecnológica.

---

## 🧰 1. Setup Inicial

### 1.1 Requisitos do Sistema
----------
### BackEnd
----------
- **Linguagem:** Node.js >= 18  
- **Banco de Dados:** SQLite3  
- **Requisitos adicionais:** Docker (opcional, mas recomendado)
  
----------
### FrontEnd
----------

- **Linguagem:** React + Vite  
- **Requisitos adicionais:** Docker (opcional, mas recomendado)

---

### 1.2 Instalação do Projeto

----------
### BackEnd
----------

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/VillaresON/5FSDT-Fase-2-Tech-Challenge.git
   ```

2. **Configurar variáveis de ambiente:**

   Crie um arquivo `.env` com base no `.env.example` e defina:

   ```
   PORT=3000
   ```

3. **Rodar a aplicação:**

   ```bash
   npm install
   npx sequelize-cli db:migrate
   npm run start
   ```

4. **(Opcional) Rodar com Docker:**

   ```bash
   # Baixando a imagem
   docker pull villares/tech-challenge:latest

   # Executar o container
   docker run --name TechChallenge -p 3000:3000 villares/tech-challenge:latest
   ```

---

## 🏗️ 2. Arquitetura da Aplicação

### 2.1 Visão Geral

O sistema é dividido em duas camadas principais:

- **Backend:** Node.js + Express + Sequelize  
- **Banco de Dados:** SQLite3

---

### 2.2 Diagrama da Arquitetura

```
[Backend] ---> [API REST] ---> [Banco de Dados]
```

---

### 2.3 Estrutura de Diretórios (Backend)

```
/src
  ├── /controllers
  ├── /routes
  ├── /models
  ├── /services
  ├── /config
  └── app.js
server.js
```

---

### 2.4 Tecnologias Utilizadas

- Node.js
- Express.js
- Sequelize ORM
- SQLite3
- Docker
- Swagger (para documentação da API)

---

## 🔌 3. Guia de Uso das APIs

### 3.1 Documentação Interativa (Swagger)

Acesse no navegador:

```
http://localhost:3000/api-docs
```

---

## 🧪 4. Testes

### 4.1 Rodar Testes Unitários

```bash
npm test
# ou
npx jest
```

---

## 📎 5. Anexos e Referências

- [🔗 Swagger](http://localhost:3000/api-docs)
- [🔗 DockerHub](https://hub.docker.com/repository/docker/villares/tech-challenge/tags/latest/sha256-fa179b64025b71da37689dfb941c4ddf90e625a438c014239f9c045b0a6c4312)

---
