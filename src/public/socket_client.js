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
  