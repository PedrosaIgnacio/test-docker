
import 'reflect-metadata';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { useContainer, useExpressServer } from 'routing-controllers';
import Container from 'typedi';
import path from 'path';
import cors from 'cors';
// import * as mongoConnection from "./src/configs/mongoose";
import { createServer } from 'http';

dotenv.config();

const app: Express = express();

const port = process.env.PORT;

useContainer(Container);

app.use(express.json());
const server = createServer(app);

app.use(
	cors({
		origin: '*', // Establece el origen permitido
		allowedHeaders: ['Content-Type', 'Authorization'], // Establece los encabezados permitidos
		credentials: true, // Habilita el soporte para credenciales (cookies, encabezados de autorización, etc.)
		methods: ['GET', 'POST', 'PUT', 'DELETE'], // Establece los métodos HTTP permitidos
	})
);

// mongoConnection.initializeMongoose();

const controllersPath = './src/controllers/**/*.controller.ts';

useExpressServer(app, {
	routePrefix:'/api/v1',
	controllers: [path.join(__dirname, controllersPath)],
});


// Iniciar el servidor HTTP
server.listen(port, () => {
	console.log(`⚡️[Find My Buddy] [Server]: Server is running at Port: ${port}`);
});