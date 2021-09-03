const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const Filter = require('bad-words'), filter = new Filter();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const app = express();
app.use(limiter);
app.use(cors());
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "webapp"
});

con.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Connected");
});


app.get('/message', (req,res) => {
    const sqlcmd = "SELECT * FROM messages";
    con.query(sqlcmd, function (err, result) {
        if (err) {
            console.error('error retrieving: ' + err.stack);
            return;
        };
        res.json(result);
        console.log("list retrieved");
    });
});



function isValidMessage(message){ //validation on server side
    return message.name && message.name.toString().trim() !== '' &&
    message.content && message.content.toString().trim() !== '' &&
    message.content.toString().trim().length < 255;
}

function insertMessage(message){
    const sqlcmd = "INSERT INTO messages (name, content, date) VALUES ('" + filter.clean(message.name) + "', '" + filter.clean(message.content) + "', '" + message.date + "')";
    con.query(sqlcmd, function (err, result) {
        if (err) {
            console.error('error inserting: ' + err.stack);
            return;
        };
        console.log("1 record inserted");
    });
}


app.post('/message', (req, res) => {
    if(isValidMessage(req.body)) {
        //insert into db
        const message = { 
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            date: new Date().toDateString() + " " + new Date().toLocaleTimeString('en-US')
        };
        
        insertMessage(message);
        res.json(message);
        

    } else{
        res.status(422);
        rest.json({
            message: "Error: Invalid Submission"
        });
    }
});


app.listen(8000, () => {console.log('Listening...');
});