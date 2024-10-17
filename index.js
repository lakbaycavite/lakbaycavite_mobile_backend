const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const app = require ('./app');
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

global.baseUrl = port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage: storage }); 


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const url = new URL(process.env.BASE_URL); 
        app.listen(url.port || 7000, () => { 
            console.log(`Connected to DB & listening on ${url.port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });