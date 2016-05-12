// [START app]
'use strict';

/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require("body-parser");
var store = require('json-fs-store')('./lectureData'); /* Creates a directory called lectureData */
var lectureContent = fs.readFileSync('resources/lecture.json');
var lectureObj = JSON.parse(lectureContent);

/* Serving static files in express */
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/resources', express.static('resources'));
app.use('/font-awesome', express.static('font-awesome'));
app.use('/img', express.static('img'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Creating the initial lecture object */
var lecture = {
    id: "lectureData",
    data: lectureObj
};

/* Adds the lecture Object to the store */
store.add(lecture, function(err) {
    if (err) console.log(err); // err if the save failed
});

/* Main Page for Slide Master */
app.get('/', function(req, res) {

    /* Sends the index html page to the user */
    fs.readFile('index.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

app.get('/demo', function(req, res) {
    fs.readFile('slidemaster.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

/* Sends the slide.html template */
app.get('/SlideMaster/slide', function(req, res) {
    fs.readFile('templates/slide.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

/* Returns the lecture content to the client */
app.get('/loadLecture', function(req, res) {
    /* Retrieving the lecture object from the store */
    store.load('lectureData', function(err, lecture) {
        if (err) console.log(err); // err if JSON parsing failed
        res.send(lecture.data);
    });
});

/* Saves the lecture object */
app.post('/saveNote', function(req, res) {
    /* The old lecture object */
    var oldLec = JSON.parse(JSON.stringify(req.body));
    
    /* Loads the previous lecture object */
    store.load('lectureData', function(err, objects) {
        if (err) throw err; // err if JSON parsing failed 
        
        /* Grabs the necessary components */
        var slideNum = oldLec.currentSlideNum;
        var noteLen = oldLec.pages[slideNum].notes.length;
        var notesArr = oldLec.pages[slideNum].notes;
        var newNotes = notesArr[noteLen - 1];
        lecture.data.pages[slideNum].notes.push(newNotes);
        
        /** Updates the lecture object */
        lecture.data = oldLec;

        /* Adds it back to the store */
        store.add(lecture, function(err){
            if (err) console.log(err); // err if the save failed
        });
    });

    /* Sends success message */
    res.send("Saved Successfully!");
});


/* Listens on the Server Port */
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
    if(process.env.PORT){
        console.log("https://slide-master-abdallahozaifa.c9users.io/");
    }else{
        console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    }
});
// [END app]
