# Usando a imagem Node.js
FROM node:14

# Definindo o diretório de trabalho
WORKDIR /app

# Instalando as dependências
COPY package*.json ./
RUN npm install

# Copiando o restante da aplicação
COPY . .

# Compilando o Prisma
RUN npx prisma generate

# Expondo a porta do servidor Express
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
