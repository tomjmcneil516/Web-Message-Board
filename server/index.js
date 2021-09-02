const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/client/index.html', (req,res) => {
    res.json({
        message: 'HELLO WORLD'
    });
});

function isValidMessage(message){
    return message.name && message.name.toString().trim() !== '' &&
    message.content && message.content.toString().trim() !== '';
}

app.post('/message', (req, res) => {
    if(isValidMessage(req.body)) {
        //insert into db
        const message = { //validation on server side
            name: req.body.name.toString(),
            content: req.body.content.toString()
        };
    console.log(message);
    } else{
        res.status(422);
        rest.json({
            message: "Error: No Content Submitted"
        });
    }
});

app.listen(8000, () => {console.log('Listening...');
});