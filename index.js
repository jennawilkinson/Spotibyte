//Import express framework
const express = require("express")
//Initialize server object
const app = express()
const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./db/data.db');
 
//Parse request data coming in
app.use(express.json())
//Serve ‘public’ folder as static website
app.use( express.static('public') )

app.get("/songs", (req, res) => {
    let sql = `SELECT * FROM songs`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
          //nothing for each row
        });
        console.log("GET /songs - songs sent to user");
        res.send(rows);
    });
})

app.post("/createAccount", (req, res) => {
    const user = req.body.user
    const sql = `INSERT INTO users 
    (firstName, lastName, email, password) 
    VALUES (?, ?, ?, ?)`
    const values = [user.firstName, user.lastName, user.email, user.password]
    let userID
    db.run(sql, values, function (err) {
        if (err)
            console.log(err)
        else {            
            console.log(`userid ${this.lastID} created`)
        }
    })
    
    res.json({
        message: 'User account created',
        userID: userID 
    })
})


app.post("/login", (req, res) => {
    const user = req.body.user
    const sql = `SELECT userid FROM users WHERE password = ? AND email = ?`
    const values = [user.first, user.last, user.email, user.password]
    let userID
    db.all(sql, values, (err, rows) => {
        //rows is an array of records from SQL query
        if (err) {
            throw err;
        }
       // else {            
       //     console.log(`userid ${this.lastID} created`)
        //}
        if (rows.length == 0) {
            res.status(404)
        res.json({
            message: 'No such user',
            userID: null
            })
        }
                 
        else {
            res.status(200)
        res.json({
            message: 'User logged in',
            userID: rows[0].userID 
            })
        }
    });  
})

app.post("/addsong", (req, res) => {
    const song = req.body.song
    const sql = `INSERT INTO songs
    (name, length, date, artist, genre) 
    VALUES (?, ?, ?, ?, ?)`
    const values = [song.name, song.length, song.date, song.artist, song.genre]
    let songID
    db.run(sql, values, function (err) {
        if (err)
            console.log(err)
        else {            
            console.log(`songid ${this.lastID} created`)
        }
    })
    
    res.json({
        message: 'User added song',
        songID: songID
    })
})

//Listens for web requests
app.listen(80, () => console.log("Server started") )


