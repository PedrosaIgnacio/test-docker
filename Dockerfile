FROM node:20

#Create app directory

WORKDIR /usr/src/app

#Copy package.json

COPY package*.json ./

#Install dependencies

RUN npm i

# Copy all files

COPY . .

# Expose port 4000

EXPOSE 4000

# Run app

CMD [ "npm", "run", "dev" ]