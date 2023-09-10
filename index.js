const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const limit = require("express-rate-limit")
const trimMiddleware= require('trim-middleware')
const SocketService = require("./Utils/socket");

require('dotenv').config();

const app = express()
const port = 3002


const server = require('http').Server(app);

app.set("socketService", new SocketService(server));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(morgan('dev'))
app.use(cors())

app.use(limit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200, // 200 request
  message: {
    toManyRequest: true,
  }
}))

app.use('/users', require('./Routes/Users'))
//app.use('/api/feedback', require('./Routes/Feedback'))
app.use('/revision', require('./Routes/Revision'))
app.use('/tools', require('./Tools/index.js'))
app.use('/revision-tools', require('./RevisionTools/index.js'))
//app.use('/api/tool', require('./Routes/Tool'))


server.listen(port, function () {
  console.debug(`listening on port ${port}`);
});