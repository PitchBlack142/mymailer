// import express (after npm install express)
const express = require('express');
require('dotenv').config();

// create new express app and save it as "app"
const app = express();

const appRoute = require('./App');
app.use(appRoute)


// server configuration
const PORT = process.env.PORT;

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});