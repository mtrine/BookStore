const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const booksRoute = require('./routes/books');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Replace with your frontend URL
    credentials: true,
};

app.use(cors(corsOptions));

// Set up CSP to allow required scripts


app.use(cookieParser());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Routes
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
app.use('/v1/books', booksRoute);
