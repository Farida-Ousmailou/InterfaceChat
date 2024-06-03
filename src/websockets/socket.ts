import queryString from "query-string";
import { Server } from "socket.io";

export default (expressServer) => {
  console.log("init web sockets", "Waitting user connexion...")
    const io = new Server(expressServer, {
      connectionStateRecovery: {}
    });
  io.on('connection', (socket) => {
    console.log("user connected")


  socket.on('chat message', (data) => {
    console.log(`Message reçu dans la room ${data.room}: ${data.message}, ${socket.id} `)
    io.to(data.room).emit('message', data.message); 
    
});

    socket.join('some room');


    socket.on('chat message', (msg) => {
      console.log('message: ' + msg + " from " + socket.id );
      io.emit("message","réponse à "+ msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

  });

  
  return io;
}