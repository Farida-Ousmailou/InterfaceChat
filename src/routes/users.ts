import express from 'express';

const userController = require('../controllers/userController'); 
const bodyParser = require('body-parser')

const router = express.Router()
const jsonParser = bodyParser.json()


const timeLog = (req, res, next) => {
	console.log('Time: ', Date.now());
	//console.log(req);
  next()
}
// router.use(timeLog)


router.post('/createAccount', jsonParser, userController.createUser);
router.post('/login', jsonParser,  userController.login);


export default router
