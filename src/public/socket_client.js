
function handleGettingPseudo() {
    const pseudoUser = localStorage.getItem("pseudo");
  
    console.log("Pseudo de l'utilisateur:", pseudoUser);
  
    var li = document.createElement("li");
  
    var textNode = "Vous êtes connectés avec le pseudo " + pseudoUser;
    li.innerText = textNode
  
    document.getElementById('body').appendChild(li);
    console.log(document.getElementById('body').appendChild(li))
  
  
  }
  
  function handleGettingroom() {
    const room = localStorage.getItem("room");
    console.log("Pseudo de l'utilisateur:", room);
  
    // const urlParams = new URLSearchParams(window.location.search);
    // const room = urlParams.get('room');
  
    console.log("Nom de la room sélectionnée :", room);
  
    var li = document.createElement("li");
    var textNode = "Channel " + room;
    li.innerText = textNode
  
    document.getElementById('body').appendChild(li);
    console.log(document.getElementById('body').appendChild(li))
  }
  
  
  function init() {
    const socket = io()
  
    socket.on('message', (msg) => {
      console.log('Message received: ' + msg);
      var li = document.createElement("li");
      var textNode = document.createTextNode(msg);
      li.appendChild(textNode);
      document.getElementById('messages').appendChild(li);
      window.scrollTo(0, document.body.scrollHeight)
    });
  
  
    document.getElementById("chat-form").addEventListener('submit', (e) => {
      e.preventDefault();
      const messageInput = document.getElementById('message-input');
      const message = messageInput.value
  
  
      if (message) {
        socket.emit('chat message', { room: 'ch1', message: message });
        messageInput.value = ""
        console.log("rien", message)
      }
    });
  
    socket.on('connection', () => {
      console.log('Connected to server');
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  
  }
  
  document.addEventListener("DOMContentLoaded", function (e) {
    console.log(" page has loaded!");
    init()
    handleGettingPseudo()
    handleGettingroom()
  });