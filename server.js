/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var queryString = require("querystring");
var bodyParser = require("body-parser");

/* Serving static files in express */
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/resources', express.static('resources'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Main Page for Slide Master */
app.get('/SlideMaster', function(req, res) {

    /* Sends the slidemaster html page to the user */
    fs.readFile('slidemaster.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

app.get('/SlideMaster/slide', function(req, res) {
    fs.readFile('templates/slide.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});


app.post('/SlideMaster/addNote', function(req, res) {
    /* QueryString is a module that stringifies json and parses it */
    var strUserNote = queryString.stringify(req.body);
    var userNote = queryString.parse(strUserNote);

    var filename = userNote.filename;
    var notes;
    /* Sends the client .... ? */
    // fs.readFile("resources/" + filename, 'utf8', function(err, data) {
    //     if (!err) notes = data;
    //     else return console.log(err);
    // });
    console.log("Received request on /SlideMaster/addNote");
});

app.get('/resources/lecture', function(req, res) {
    fs.readFile('resources/lecture.json', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else console.log(err);
    });
});

/* Insert Nodes Iframe URL Handler */
app.get('/resources/noteInterface', function(req, res) {
    fs.readFile('resources/noteInterface.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else console.log(err);
    });
});

/* Display Nodes Iframe URL Handler */
app.get('/resources/noteDisplay', function(req, res) {
    fs.readFile('resources/noteDisplay.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else console.log(err);
    });
});


/* Listens on the cloud9 Port */
app.listen(process.env.PORT, function() {
    console.log('App listening at https://slide-master-abdallahozaifa.c9users.io/SlideMaster');
});
