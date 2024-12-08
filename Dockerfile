# Usa l'immagine ufficiale di Node.js
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file package.json e package-lock.json (se presente)
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del progetto nel container
COPY . .

# Costruisci l'app Next.js
RUN npm run build

# Esponi la porta su cui l'app Next.js sarà in esecuzione
EXPOSE 3000

# Esegui il server Next.js
CMD ["npm", "start"]
