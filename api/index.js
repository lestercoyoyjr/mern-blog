const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require("dotenv").config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

// in order to encrypt password
const salt = bcrypt.genSaltSync(10);
const secret = 'sdfio43rm0934lkds2340fdsga';

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try {
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);   
    } catch (e) {
        res.status(400).json(e);
    }
})

app.post('/login', async (req,res) => {
    const{username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });
        // res.json();
    } else {
        res.status(400).json('wrong credentials')
    }
});

app.listen(4000)