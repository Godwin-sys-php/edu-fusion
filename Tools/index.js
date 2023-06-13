
const express = require('express');

const creditCheck = require("../Middlewares/Exists/creditCheck");
const authUser = require('../Middlewares/Auth/authUser');
const creditPayment = require("../Middlewares/Tools/creditPayment");
const saveToHistory = require("../Middlewares/Tools/saveToHistory");
const sendResponse = require("../Middlewares/Tools/sendResponse");

let app = express.Router()

// middleware
app.use('/', authUser); 
app.use('/', creditCheck); 

// utils
app.use('/', require('./Utils/history'));
app.use('/', require('./Utils/favorite'));

// tools
app.use('/', require('./intro'));
app.use('/', require('./development'));
app.use('/', require('./dissertation'));
app.use('/', require('./revision'));
app.use('/', require('./correction'));
app.use('/', require('./rewriting'));
app.use('/', require('./summarize'));
app.use('/', require('./poem'));
app.use('/', require('./content-generator'));
app.use('/', require('./synonym'));
app.use('/', require('./traduction'));
app.use('/', require('./freestyle'));

app.use('/', creditPayment); 
app.use('/', saveToHistory); 

app.use('/', sendResponse); 

module.exports = app