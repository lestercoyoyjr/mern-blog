const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.post('/register', (req,res) => {
    const {username,password} = req.body;
    res.json({requestData:{username,password}});
})

app.listen(4000)