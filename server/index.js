const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


//database stuff

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "webapp"
});




//database stuff end



app.use(cors());
app.use(express.json());

app.get('/client/index.html', (req,res) => {
    res.json({
        message: 'HELLO WORLD'
    });
});

function isValidMessage(message){ //validation on server side
    return message.name && message.name.toString().trim() !== '' &&
    message.content && message.content.toString().trim() !== '' &&
    message.content.toString().trim().length < 255;
}

function insertMessage(message){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        const sqlcmd = "INSERT INTO messages (name, content, date) VALUES ('" + message.name + "', '" + message.content + "', '" + message.date + "')";
        con.query(sqlcmd, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
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