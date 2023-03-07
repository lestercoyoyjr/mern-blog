const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.post('/register', (req,res) => {
    res.json('ok');
})

app.listen(4000)