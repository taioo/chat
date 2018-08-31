/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const session = require('express-session');
const socketServer = require('./server/connections/socketIoServer');

// API file for interacting with MongoDB
const history = require('./server/routes/history');
const user = require('./server/routes/users');

//Create connection to redis for session handling
app.use(session({
  secret: 'topsecret',
    resave: true,
    saveUninitialized: true,
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var cors = require('cors');
// use it before all route definitions
app.use(cors({origin: '*'}));

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//start socketServer
socketServer.start();

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', history);
app.use('/api/sql', user);

app.post('/afterlogin',function(req,res){
});

app.get('/logout',function(req,res){
    console.log("Session was destroyed");
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
