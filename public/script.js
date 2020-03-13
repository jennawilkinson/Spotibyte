const $songsContainer = document.querySelector("section#songs")
const $cart = document.querySelector("section#cart ul")
let items = []
let songs = []
let inCart = []

//loadItems()
loadSongs()
function loadSongs() {
    fetch("/songs")
        .then( response => response.json() )
        .then( response => {
        console.log(response)
            createSongCards(response) 
        })
        .catch(err => console.error(err))
}

//new stuff
function addSongs(){
     event.preventDefault()
    //create order object
    const $form = document.forms[1]
    const order = {
        song: {
            name: $form.name.value,
            artist: $form.artist.value,
            genre: $form.genre.value
            
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/addsong",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}

function createSongCards(_songs) {
    songs = _songs
    const songsHTML = _songs.map(song => 
        `<div class="song">
            <h3>Name: ${song.name}</h3>            
            <button onClick="Play(${song.songid}, event)">Play</button>
        </div>`
    ).join('')
    $songsContainer.innerHTML = songsHTML    
}

function login(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[0]
    const order = {
        user: {
            first: $form.firstName.value,
            last: $form.lastName.value,
            email: $form.email.value,
            password: $form.password.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/login",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}

function createAccount(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[0]
    const order = {
        user: {
            first: $form.firstName.value,
            last: $form.lastName.value,
            email: $form.email.value,
            password: $form.password.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/createAccount",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}

function addToCart(id, event) {
    const item = items.find(item => item.itemid == id)

    const $newItem = document.createElement("li")
    $newItem.innerHTML = 
        `${item.name}`
    $cart.append($newItem)
    inCart.push(item)
    document.querySelector("span#itemCount").innerHTML = inCart.length
}

