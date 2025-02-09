const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// GET route for fetching all users
app.get('/users', async (req, res) => {
    const users = await User.find({});

    try {
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST route for inserting a user
app.post('/users', async (req, res) => {
    try {
        if (req.body) {
            const newUser = new User(req.body);
            console.log(`User to save to DB: ${JSON.stringify(newUser)}`);
            
            await newUser.save();
            res.status(201).json({
                message: `User added to DB successfully`,
                user: newUser
            });
        } else {
            console.log(`No data provided to be saved.`);
            res.status(400).json({ error: "No data provided" });
        }
        
    } catch (err) {
        console.log(`Something went wrong while saving user: ${JSON.stringify(err)}`);

        if (err.name === "ValidationError") {
            const validationErrors = Object.values(err.errors).map(error => error.message);
            res.status(400).json({ errors: validationErrors });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
});

module.exports = app;

  