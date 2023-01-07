require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const Store = require('connect-mongo');
const path = require('path');

require('./database/login/GoogleStrategy');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = process.env.PORT || 5000;

const app = express();

const cors = require('cors')
const whitelist = ['http://localhost:3000', 'http://localhost:5000'];
app.use(cors({
  origin: whitelist,
  credentials: true,
  optionSuccessStatus: 200,
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  resave: false,
  saveUninitialized: false,
  store: Store.create({ mongoUrl: process.env.DATABASE_URL })
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize())
app.use(passport.session())

const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const routes = require('./routes');
app.use('/api', routes)

app.use(express.static(path.join(__dirname, '/build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})