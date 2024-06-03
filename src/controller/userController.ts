import { Request, Response } from 'express';
import mysql from 'mysql2';
import User from '../userInterface/Users'
import jwt from 'jsonwebtoken';

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})


export const createUser = async (req: Request, res: Response) => {
	const newUser: User = {
		name: req.body.name,
		pseudo: req.body.pseudo,
		mail: req.body.mail,
		password: req.body.password,
	}
	try {
		connection.query('INSERT INTO users SET ?', newUser);
		if(res.status(200)){
			res.status(200).send(`User created successfully ${newUser}`);
		} else {
			console.log("grosse erreur")
		}
	} catch (error) {
			console.error('Error creating user:', error);
			res.status(500).send('Internal Server Error');
	}
}

export const createUser = async (req: Request, res: Response) => {
	const newUser: User = {
		name: req.body.name,
		pseudo: req.body.pseudo,
		mail: req.body.mail,
		password: req.body.password,
	}
	try {
		connection.query('INSERT INTO users SET ?', newUser);
		if(res.status(200)){
			res.status(200).send(`User created successfully ${newUser}`);
		} else {
			console.log("grosse erreur")
		}
	} catch (error) {
			console.error('Error creating user:', error);
			res.status(500).send('Internal Server Error');
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const credentials: Omit<User, "name" | "pseudo"> = {
			mail: req.body.mail,
			password: req.body.password,
		};

	console.log('the credentials', credentials.mail, credentials.password)

	const response = await connection.promise().query('SELECT * FROM users WHERE mail = ?', [credentials.mail],);
	const DBPassword = response[0][0]["password"];
	const DBmail = response[0][0]["mail"];
	console.log('password', DBPassword);
	console.log('mail', DBmail);

	if(DBPassword === credentials.password && DBmail === credentials.mail) {
		console.log("you can have your token")
		const token =  generateAccessToken (response);
		console.log('accessToken', token);
		res.json({ token });
	}
	} catch (error) {
		console.error(error);
	}
}


 function generateAccessToken(response) {
	const id = response[0][0].id
	console.log('le process', process.env.TOKEN_SECRET);
	return  jwt.sign({ id } , process.env.TOKEN_SECRET, {expiresIn: 100000000000});
}


