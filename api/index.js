const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require("dotenv").config();
const User = require('./models/User');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try {
        const userDoc = await User.create({username, password});
        res.json(userDoc);   
    } catch (e) {
        res.status(400).json(e);
    }
    
})

app.listen(4000)