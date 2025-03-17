const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const app = express(); // ✅ Removed 'require("./app")' since we define app here

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (Uploads Folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Multer Config (For Image Uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// ✅ Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
        message: 'File uploaded successfully',
        filePath: `${process.env.BASE_URL}/uploads/${req.file.filename}`, // ✅ Absolute URL
    });
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`✅ Connected to MongoDB`);
    })
    .catch((error) => {
        console.log("❌ Database Connection Error:", error);
    });

// ✅ Export the app (Para sa Vercel)
module.exports = app;



// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();
// const multer = require('multer');
// const path = require('path');
// const app = require ('./app');
// const port = process.env.PORT;
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// global.baseUrl = port;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); 
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     },
// });

// const upload = multer({ storage: storage }); 


// // Route for image upload
// app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
//     res.status(200).json({
//       message: 'File uploaded successfully',
//       filePath: `${port}/uploads/${req.file.filename}`,
//     });
//   });

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         const url = new URL(process.env.BASE_URL);  // Default to 5000 if missing
//         const PORT = url.port || 5000; // Use PORT 5000 if missing

//         app.listen(PORT, "0.0.0.0", () => {  // 🔹 Allow external access
//             console.log(`Connected to DB & listening on ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.log("Database Connection Error:", error);
//     });
