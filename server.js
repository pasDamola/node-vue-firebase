// set up ========================

var express  = require('express');

var app      = express();                              // create our app w/ express

var Firebase = require('firebase');

var morgan = require('morgan');      

var bodyParser = require('body-parser');    // pull information from HTML POST (express4)

var methodOverride = require('method-override');

// var multer  =   require('multer');

var fs = require("fs");

app.use(function(req, res, next) { //allow cross origin requests

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");

    res.header("Access-Control-Max-Age", "3600");

    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    next();

});

Firebase.initializeApp({

    databaseURL: "https://fir-vue-4ffa4.firebaseio.com/",

    serviceAccount: './serviceAccount.json', //this is file that I downloaded from Firebase Console

});

var db = Firebase.database();

var notificationsRef = db.ref("notifications");



app.use(morgan('dev'));                                         // log every request to the console

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded

app.use(bodyParser.json());                                     // parse application/json

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/', function (req, res) {

  res.sendfile('./index.html')

})

// create user

app.post('/api/createUser', function(req, res) {

   // var userEmail = req.body.user_email;

    var data = req.body;

usersRef.push(data, function(err) {

if (err) {

res.send(err)

} else {

// var key = Object.keys(snapshot.val())[0];

// console.log(key);

res.json({message: "Success: User Save.", result: true});

}

});

});


// delete user

app.delete('/api/removeUser', function(req, res) {

var uid = "-Ks8HilZxX5vtFPqGu75";

usersRef.child(uid).remove(function(err) {

if (err) {

res.send(err);

} else {

res.json({message: "Success: User deleted.", result: true});

}

})

});

// get users

app.get('/api/getNotifications', function(req, res) {

notificationsRef.once("value", function(snapshot) {

//console.log(snapshot);

if (snapshot.val() == null) {

res.json({message: "Error: No user found", "result": false});

} else {

res.json({"message":"successfully fetch data", "result": true, "data": snapshot.val()});

}

});



});



app.listen(3000);

console.log("port is 3000");