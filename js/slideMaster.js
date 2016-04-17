$(document).ready(function(){
    
    /* Icons object that contains all the icons on the page */
    var icons = {
        play: $("i")[0],
        up: $("i")[1],
        down: $("i")[2],
        stop: $("i")[3],
        audio: $("i")[4],
        save: $("i")[5]
    };
    
    /* Icons click handlers for all the icons */
    $(icons.play).click(function(){
       console.log("Play!"); 
    });
    
    $(icons.up).click(function(){
       console.log("up!"); 
    });
    
    $(icons.down).click(function(){
       console.log("down!"); 
    });
    
    $(icons.stop).click(function(){
       console.log("Play!"); 
    });
    
    $(icons.audio).click(function(){
       console.log("audio!"); 
    });
    
    $(icons.save).click(function(){
       console.log("save!"); 
    });
    
});