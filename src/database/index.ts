import mysql from 'mysql2'

export function init_database() {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'myIRC'
      })
      
    connection.connect((error: any) => { 
          if (error){ 
                  console.log("A error has been occurred "
                          + "while connecting to database."+ error.stack);
                  return;
          }
          console.log("connected to database");
      });
      
      let sql1 = "CREATE TABLE if not exists users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), mail VARCHAR(255), password VARCHAR(30))";
      connection.query(sql1, function (err: any) {
          if (err) throw err;
          console.log("table users created");
      });
      
      let sql2 = "CREATE TABLE if not exists  messages(id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(500), created_at DATE, user_id INT, FOREIGN KEY (user_id) REFERENCES users(id))";
      connection.query(sql2, function (err:any) {
          if (err) throw err;
          console.log("table messages created");
      })
      

      connection.end((error) => {
        if (error) {
          console.error('Error closing MySQL connection:', error);
          return;
        }
    
        console.log('MySQL connection closed.');
      });
    
      
      return connection;
      
}