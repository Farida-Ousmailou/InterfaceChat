function sendDataMessgePublic() {
    const message = document.getElementById('message-input').value
    fetch('/index.html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Inputmessagepublic: message })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête');
        }
        return response.json();
      })
      .then(data => {
        console.log('Données enregistrées avec succès:', data);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  
  }
  
  function handleGettingPseudo() {
    const pseudoUser = localStorage.getItem("pseudo");
  
    console.log("Pseudo de l'utilisateur:", pseudoUser);
  
    var li = document.createElement("li");
  
    var textNode = "Vous êtes connectés";
    li.innerText = textNode
  
    document.getElementById('body').appendChild(li);
    console.log(document.getElementById('body').appendChild(li))
  
  
  }
  
  function handleGettingroom() {
    const room = localStorage.getItem("room");
  
    console.log("Nom de la room sélectionnée :", room);
  
    var li = document.createElement("li");
    var textNode = "Inbox";
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
      document.getElementById('message-container').appendChild(li);
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