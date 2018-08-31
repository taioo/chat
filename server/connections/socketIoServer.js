var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);



var chat = {
	start: function(){
		server.listen(8000);
		io.set("origins", "*:*");

		io.on('connection', function (socket) {
			console.log('Socket connected');
		});

    function socketDisconnect(e){
      console.log('Socket Disconnected ', e);
    }
	}
};

module.exports = chat;
