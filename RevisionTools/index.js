const express = require('express');

const creditCheck = require("../Middlewares/Exists/creditCheck");
const authUser = require('../Middlewares/Auth/authUser');
const creditPayment = require("../Middlewares/Tools/creditPayment");
const saveToRevisionHistory = require("../Middlewares/Tools/saveToRevisionHistory");
const sendResponse = require("../Middlewares/Tools/sendResponse");

let app = express.Router()

// middleware
app.use('/', authUser); 
app.use('/', creditCheck); 

// utils
app.use('/', require("./Utils/getOne"))

// tools
app.use('/', require("./mind-map.js"));
app.use('/', require("./timeline.js"));
app.use('/', require("./flashcards.js"));
app.use('/', require("./quiz.js"));

app.use('/', creditPayment); 
app.use('/', saveToRevisionHistory); 

app.use('/', sendResponse); 

module.exports = app