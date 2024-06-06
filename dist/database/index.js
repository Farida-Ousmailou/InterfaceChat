"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init_database = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
function init_database() {
    const connection = mysql2_1.default.createConnection({
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'myIRC'
    });
    connection.connect((error) => {
        if (error) {
            console.log("A error has been occurred "
                + "while connecting to database." + error.stack);
            return;
        }
        console.log("connected to database");
    });
    let sql1 = "CREATE TABLE if not exists users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), mail VARCHAR(255), password VARCHAR(30))";
    connection.query(sql1, function (err) {
        if (err)
            throw err;
        console.log("table users created");
    });
    let sql2 = "CREATE TABLE if not exists  messages(id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(500), created_at DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES users(id))";
    connection.query(sql2, function (err) {
        if (err)
            throw err;
        console.log("table messages created");
    });
    let sql3 = `
      CREATE TABLE IF NOT EXISTS channels (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          type_channel VARCHAR(255),
          created_at DATE,
          message_id INT,
          user_id INT,
          FOREIGN KEY (message_id) REFERENCES messages(id),
          FOREIGN KEY (user_id) REFERENCES users(id)
      )
      `;
    connection.query(sql3, function (err) {
        if (err)
            throw err;
        console.log("table channels created");
    });
    connection.end((error) => {
        if (error) {
            console.error('Error closing MySQL connection:', error);
            return;
        }
        console.log('MySQL connection closed.');
    });
    return connection;
}
exports.init_database = init_database;
//# sourceMappingURL=index.js.map