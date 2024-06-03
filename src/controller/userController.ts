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
};