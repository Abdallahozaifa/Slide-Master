/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();

app.get('/SlideMaster', function(req,res){
    fs.readFile('slidemaster.html', 'utf8', function(err, data){
        if(!err) res.send(data);
        else return console.log(err);
    });
});

app.listen(process.env.PORT, function() {
  console.log('App listening at http://%s:%s', process.env.IP, process.env.PORT);
});