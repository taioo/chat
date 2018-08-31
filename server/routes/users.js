/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');

var con = mysql.createConnection({
    host: "localhost",
    user: "root"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("USE chat", function (err, result) {
      if (err) throw err;
      console.log("USER database Connected");
    });
  });


// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


// get all users
router.get('/user/all', function (req, res) {
    con.query('SELECT * FROM user', function (error, results) {
        if (error) {
            throw error;
        } else {
            response.data = results;
            res.json(response);
        }
    });
});

// isUser exists in database
router.post('/user', function (req, res) {
    var username = req.body._username;
    var password = crypto.createHash('md5').update(req.body._password).digest('hex');

    con.query('SELECT username FROM user WHERE user.username = ' + mysql.escape(username) +
        ' AND user.password = ' + mysql.escape(password) + ' LIMIT 1',
        function (error, getResult) {
            if (error) {
                throw error;
            }

            //Session
            if (getResult.length > 0) {
                req.session.key = username;
                req.session.loggedin = true;
                req.session.save();
                console.log(req.session.loggedin);
                res.json({status: true});
            } else {
                req.session.loggedin = false;
                res.json({
                    status: false
                });
            }
        });
});

router.post('/user/new', function (req, res) {

    var username = req.body._username;
    var password = crypto.createHash('md5').update(req.body._password).digest('hex');

    if (!username || username.length == 0 || !password || password.length == 0) {
        res.json({
            status: false,
            message: "Incomplete information"
        });

    } else {
        con.query('SELECT * FROM user WHERE user.username = ' + mysql.escape(username), function (error, getResult) {
            if (getResult.length > 0) {
                res.json({
                    status: false,
                    message: "Username is already taken"
                });
            } else {
                con.query('INSERT INTO user SET ?', { "username": username, "password": password }, function (error, writeResult) {
                    if (error) {
                        throw error;
                    }
                    if (writeResult.affectedRows > 0) {
                        res.json({
                            status: true
                        });
                    } else {
                        res.json({
                            status: false
                        });
                    }
                });
            }
        });
    }
});



module.exports = router;
