const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

// Calling express allows you to create routes.
const app = express();

app.use(express.urlencoded({ extended: true }));
// When you hit any requests, the body will be parsed using body-parser
app.use(bodyParser.json());
// app.use(express.json());


// Import Routes - Below, we have postsRoute being passed to the endpoint when the endpoint includes '/posts'.
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);


// Middleware - You can create middleware, which are functions that run automatically when you inject it into a route or visit a route.
// app.use('/posts', () => {
//   console.log("This is a middleware running");
// })


// ROUTES (GET, POST, PUT, DELETE)
app.get('/', (req, res) => {
  res.send('Successful Response');
});


// CONNECT TO DB
// Usually you wouldn't add the database username and password.
// Use the dotenv package hide secrets from urls.
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to DB!')
});


// How to start listening to the server:
app.listen(3000);