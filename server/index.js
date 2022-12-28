import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded())
app.use(cors())

const PORT = 3001;
const MONGODB_URI = 'mongodb+srv://chetan:chetan@cluster0.xcmuzl0.mongodb.net/?retryWrites=true&w=majority'
// const MONGODB_URI = 'mongodb://localhost:27017/mernAuth'
mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.send("Backend running...")
})

// POST - Register
app.post('/register', (req, res) => {
    console.log("post request register", req.body)

    const { name, email, password } = req.body;
    User.findOne({ email }, async (err, user) => {
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.log("user does not exist, creating new user")
        console.log("name, email, password", name, email, password)
        // Hash the password & set as the password for the new user
        const newPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: newPassword
        });
        console.log("newUser", newUser)
        newUser.save(err => {
            if (err) {
                console.log("error saving user to database", err)
                return res.status(400).json({ message: 'Error saving user to database. Please try again.' });
            }
            return res.status(201).json({ message: 'User created' });
        })
    }
    );
});

// POST - Login
app.post('/login', (req, res) => {
    console.log("post request login", req.body);

    const { email, password } = req.body;
    User.findOne({ email: email }, async (err, user) => {
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // if (password !== user.password) {
        //     return res.status(400).json({ message: 'Password is incorrect' });
        // }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        const token = jwt.sign({
            // id: user._id,
            name: user.name,
            email: user.email
        }, 'myNewSecret')

        console.log("login successful", user);
        return res.status(200).json({
            message: 'Login successful',
            user: user,
            token: token
        });
    });
});

// PUT - Edit user
app.put('/edit', (req, res) => {
    // Retrieve the user's information from the request body
    const { name, email, password, loggedUserEmail } = req.body;

    // Find the user in the database
    User.findOne({ email: loggedUserEmail }, async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error finding user' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // if (password !== user.password) {
        //     return res.status(400).json({ message: 'Password is incorrect' });
        // }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        // Update the user's information
        user.set({ name: name, email: email });
        user.save((err) => {
            if (err) {
                return res.status(400).json({ message: 'Error updating user' });
            }
            return res.status(200).json({ message: 'User updated successfully' });
        });
    });
});


// POST - Logout
app.post('/logout', (req, res) => {
    console.log("post request logout", req.body);
    return res.status(200).json({ message: 'Logout successful' });
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
}
)