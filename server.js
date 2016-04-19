/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var slideMaster = require("./js/slideModule.js");

/* Serving static files in express */
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/resources', express.static('resources'));


/* Main Page for Slide Master */
app.get('/', function(req,res){
    /* Sends the slidemaster html page to the user */
    fs.readFile('slidemaster.html', 'utf8', function(err, data){
        if(!err) res.send(data);
        else return console.log(err);
    });
});

app.get('/slide', function(req, res){
    fs.readFile('templates/slide.html', 'utf8', function(err, data){
        if(!err) res.send(data);
        else return console.log(err);
    });
});

app.get('/resources/lecture', function(req, res) {
    fs.readFile('resources/lecture.json', 'utf8', function(err, data){
        if (!err) 
            res.send(data);
        else 
            console.log(err);
    });
});

/* Listens on port 8080 */
//app.listen(8080, function() {
// console.log('localhost:8080');
//});

/* Listens on the cloud9 Port */
app.listen(process.env.PORT, function() {
  console.log('App listening at https://slide-master-abdallahozaifa.c9users.io/SlideMaster');
});