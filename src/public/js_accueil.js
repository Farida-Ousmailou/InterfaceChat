

function sendform() {
    const pseudo = document.getElementById("name-input").value;
    const room = document.getElementById("createRoom").value


    fetch('/accueil.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Inputroom: room })
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


function handleData() {



    document.getElementById("submit").style.display = "none"

    console.log("pseudo", document.getElementById("submitAcueil"))

    document.getElementById("submitAcueil").addEventListener('click', (e) => {
        e.preventDefault();


        const pseudo_user = document.getElementById("name-input");
        const pseudo = pseudo_user.value;

        if (pseudo === "") {
            var textNode = "Veillez choisir un pseudo";

            div = document.getElementById("pseudoRequired");

            div.innerText = textNode

            console.log(document.getElementById("pseudoRequired"))

        }

        if (pseudo != "") {
            document.getElementById("submitAcueil").style.display = "none"
            addUser(pseudo)
            console.log("pseudo user", pseudo);
        }


        localStorage.setItem("pseudo", pseudo);

    })
}
