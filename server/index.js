import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded())
app.use(cors())

const PORT = 3001;
const MONGODB_URI = 'mongodb+srv://chetan:chetan@cluster0.xcmuzl0.mongodb.net/?retryWrites=true&w=majority'
// const MONGODB_URI = 'mongodb://localhost:27017/mernAuth'

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
// POST - Register
app.post('/register', (req, res) => {
    console.log("post request register", req.body)
    const { name, email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.log("user does not exist, creating new user")
        console.log("name, email, password", name, email, password)
        const newUser = new User({
            name: name,
            email: email,
            password: password
        });
        console.log("newUser", newUser)
        newUser.save({wtimeout: 20000},err => { // increase timeout
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
    console.log("post request login")

    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        if (password !== user.password) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }
        console.log("login successful", user);
        return res.status(200).json({ message: 'Login successful' });
    });
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
}
)