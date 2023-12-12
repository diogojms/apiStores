FROM node:18

# Create app directory
WORKDIR /usr/src/store/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8086
CMD [ "node", "server.js" ]

#docker build -t api-store . 
#docker run --name api-store -p 8086:8086 -d api-store