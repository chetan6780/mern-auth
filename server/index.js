import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/user.model.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mernAuth";
mongoose.set("strictQuery", true);

mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Connected to MongoDB");
    }
);

// Routes
// GET - Home
app.get("/api/", (req, res) => {
    res.send("Backend running...");
});

// POST - Register
app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email }, async (err, user) => {
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hash the password & set as the password for the new user
        const newPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: newPassword,
        });
        newUser.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: "Error saving user to database. Please try again.",
                });
            }
            return res.status(201).json({ message: "User created" });
        });
    });
});

// POST - Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, async (err, user) => {
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
        );

        return res.status(200).json({
            message: "Login successful",
            user: user,
            token: token,
        });
    });
});

// PUT - Edit user
app.put("/api/edit", (req, res) => {
    // Retrieve the user's information from the request body
    const { name, email, password, loggedUserEmail } = req.body;

    // Find the user in the database
    User.findOne({ email: loggedUserEmail }, async (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Error finding user" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPassword = await bcrypt.hash(password, 10);

        // Update the user's information
        user.set({ name: name, email: email, password: newPassword });

        // check if email already exists
        if (email !== loggedUserEmail) {
            try {
                const userExists = await User.findOne({ email: email });
                if (userExists) {
                    return res
                        .status(400)
                        .json({ message: "Email already exists" });
                }
            } catch (err) {
                return res.status(500).json({ message: "Error finding user" });
            }
        }

        // Save the updated user to the database
        user.save((err) => {
            if (err) {
                return res.status(400).json({ message: "Error updating user" });
            }
            return res
                .status(200)
                .json({ message: "User updated successfully", user: user });
        });
    });
});

// POST - Logout
app.post("/api/logout", (req, res) => {
    return res.status(200).json({ message: "Logout successful" });
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
