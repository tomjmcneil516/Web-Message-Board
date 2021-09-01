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

app.post('/input', (req, res) => {
    console.log(req.body);
});

app.listen(5500, () => {console.log('Listening...');
});