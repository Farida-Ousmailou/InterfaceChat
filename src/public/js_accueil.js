

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

    document.getElementById("submitroom").addEventListener('click', (e) => {
        e.preventDefault();

        sendform()
        const room_create = document.getElementById("createRoom");
        const room = room_create.value;



        if (room === "") {
            var textNode = "Veillez saisir l'intitulé de votre chaine";

            div = document.getElementById("roomRequired");

            div.innerText = textNode

            console.log(document.getElementById("roomRequired"))

        } else {
            document.getElementById("submit").style.display = "block"
        }


        console.log("Room create", room);


        localStorage.setItem("room", room);
    });

}


// let channels = [];

function addChannel(channelName) {

    const existingChannels = document.getElementById("existing-channels")

    var li = document.createElement("li");

    const link = document.createElement("a");
    link.href = "./index.html"
    link.innerText = "Channel " + channelName
    li.appendChild(link)
    existingChannels.appendChild(li);

    console.log(existingChannels.appendChild(li))

}

function loadChannelsFromLocalStorage() {
    const channelsString = localStorage.getItem("channels")
    if (channelsString) {
        const channels = channelsString.split(",")
        channels.forEach(function (channelName) {
            addChannel(channelName.trim());
        });
    }
}


function addAllRoom() {
    document.getElementById("submit").addEventListener("click", function (e) {
        // e.preventDefault()

        const room = document.getElementById("createRoom").value;

        console.log("Channel created", room)

        if (room != "") {
            addChannel(room)
            saveChannel(room)

        }



    })

}

function saveChannel(channelName) {
    let channels = localStorage.getItem("channels")
    channels = channels.split(",");
    channels.push(channelName);
    localStorage.setItem("channels", channels.join(","));
}

function addUser(pseudo) {

    const UsersOnLine = document.getElementById("connected-users")

    var li = document.createElement("li");

    const link = document.createElement("a");
    link.href = "./PrivateChannel.html"
    link.innerText = pseudo + " On line "
    li.appendChild(link)
    UsersOnLine.appendChild(li);
    console.log(document.getElementById('connected-users').appendChild(li))
}

document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault()
    console.log("page has loaded!");
    document.getElementById("submit").style.display = "none"
    handleData()
    addAllRoom()
    loadChannelsFromLocalStorage()
    addUser(localStorage.getItem("pseudo"))
})

