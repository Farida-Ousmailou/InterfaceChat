require('dotenv').config({ path: './.env' });


import express from 'express'
import { createServer } from 'node:http'
import path, { join } from 'path'
import { init_database } from './database';
import websocketServer from './websockets/index_public';
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
import mysql from 'mysql2'

const PORT = 3000;

const app = express();

const router = require('./routes/users.ts');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function startServer() {
	console.log("startServer ")
	app.use("/", router)
	init_database()
	const server = createServer(app)

	server.listen(PORT, () => { console.log(`Listen ${PORT}`) })
}



startServer()