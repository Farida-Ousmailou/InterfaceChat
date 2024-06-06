"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = require('../controllers/userController');
const bodyParser = require('body-parser');
const router = express_1.default.Router();
const jsonParser = bodyParser.json();
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now());
    //console.log(req);
    next();
};
// router.use(timeLog)
router.post('/createAccount', jsonParser, userController.createUser);
router.post('/login', jsonParser, userController.login);
exports.default = router;
//# sourceMappingURL=users.js.map