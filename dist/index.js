"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const database_1 = require("./database");
// import websocketServer from './websockets/index_public';
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const users_1 = __importDefault(require("./routes/users"));
const PORT = 3000;
const app = (0, express_1.default)();
// const router = require('../src/routes/users')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
function startServer() {
    console.log("startServer ");
    app.use("/", users_1.default);
    (0, database_1.init_database)();
    const server = (0, node_http_1.createServer)(app);
    // getInputHomePage(app)
    server.listen(PORT, () => { console.log(`Listen ${PORT}`); });
}
startServer();
//# sourceMappingURL=index.js.map