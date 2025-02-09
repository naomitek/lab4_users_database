const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes.js');

const PORT = process.env.PORT || 8081;

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data from forms

// Helper function to connect to MongoDB asynchronously
const connectDB = async () => {
    try {
        console.log(`Attempting to connect to DB`);

        const mongoURI = "mongodb+srv://db1399:sunriseme@cluster-2.gxhja.mongodb.net/lab4_users_database?retryWrites=true&w=majority";
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected`);
    } catch (err) {
        console.log(`Error while connecting to MongoDB: ${err.message}`);
    }
};

const onServerStart = () => {
    console.log(`The server started running at http://localhost:${PORT}`);
    console.log(`Press Ctrl+c to stop`);

    // Connect to the database
    connectDB();
};

app.use(userRoutes);

app.listen(PORT, onServerStart);
