/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/chat', (err, client) => {
        if (err) return console.log(err);

        let db = client.db('chat');
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get Channels
router.get('/channels', (req, res) => {
    connection((db) => {
        db.collection('channels')
            .find({ "$or": [{ "participants": req.query.username }, { "isPublic": true }] })
            .toArray()
            .then((channels) => {
                response.data = channels;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


//Create Channel
router.post('/channel', (req, res) => {
    connection((db) => {
        db.collection('channels')
            .insert({ "name": req.body._name, "participants": req.body._participants, "conversation": req.body._conversation, "isPublic": req.body._isPublic })
            .then((channels) => {
                response.data = channels;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Post Message
router.post('/message', (req, res) => {
    connection((db) => {
        db.collection('channels')
            .update({ "_id": ObjectID(req.body._channel) },
            {
                "$push":
                {
                    "conversation":
                    {
                        "sender": req.body._sender,
                        "message": req.body._message,
                        "status": req.body._status,
                        "creationDate": req.body._creationDate
                    }
                }
            }
            )
            .then((channels) => {
                response.data = channels;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;
