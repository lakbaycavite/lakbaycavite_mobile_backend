const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
<<<<<<< HEAD
=======
// const app = express(); // Initialize the Express app
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
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


<<<<<<< HEAD

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
=======
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure 'uploads' folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
});

const upload = multer({ storage: storage }); // Set up multer

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const url = new URL(process.env.BASE_URL); // Create a URL object to extract port
        app.listen(url.port || 7000, () => { // Fallback to 5000 if no port is specified
            console.log(`Connected to DB & listening on ${process.env.PORT}`);
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
        });
    })
    .catch((error) => {
        console.log(error);
    });