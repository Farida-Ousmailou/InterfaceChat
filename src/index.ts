require('dotenv').config({ path: './.env' });


import express from 'express'
import { createServer } from 'node:http'
import path, { join } from 'path'
import { init_database } from './database';
import websocketServer from './websockets/socket';
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
import mysql from 'mysql2'
import router from './routes/users';

const PORT = 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function startServer() {
	console.log("startServer ")
	app.use("/", router)
	init_database()
	fontend(app)

	const server = createServer(app);

	websocketServer(server);


	server.listen(PORT, () => { console.log(`Listen ${PORT}`) })
}


startServer()


function fontend(app) {
	app.use(express.static(path.join(__dirname, "public")))


	app.get('/', (req, res) => {
		res.sendFile(join(__dirname, 'views/signUp.html'));
	});

	app.get('/logIn.html', (req, res) => {
		res.sendFile(join(__dirname, 'views/logIn.html'));
	});

	app.get('/accueil.html', (req, res) => {
		res.sendFile(join(__dirname, 'views/accueil.html'));
	});

	app.get('/index.html', (req, res) => {
		res.sendFile(join(__dirname, 'views/index.html'));
	});

	app.get("/PrivateChannel.html", (req, res) => {
		res.sendFile(join(__dirname, 'views/PrivateChannel.html'));
	});
}