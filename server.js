/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var slideMaster = require("./js/slideModule.js");

/* Serving static files in express */
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));


/* Main Page for Slide Master */
app.get('/SlideMaster', function(req,res){
    /* Sends the slidemaster html page to the user */
    fs.readFile('slidemaster.html', 'utf8', function(err, data){
        if(!err) res.send(data);
        else return console.log(err);
    });
});

app.get('/SlideMaster/slide', function(req, res){
   console.log("User wants the slide!");
   /* Sends the template html page to the user */
    fs.readFile('templates/slide.html', 'utf8', function(err, data){
        if(!err) res.send(data);
        else return console.log(err);
    });
});

/* Listens on the cloud9 Port */
app.listen(process.env.PORT, function() {
  console.log('App listening at https://slide-master-abdallahozaifa.c9users.io/SlideMaster');
});