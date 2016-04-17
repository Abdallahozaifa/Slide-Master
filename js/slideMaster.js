$(document).ready(function(){
    
    var injectIframeContent = function(){
        setTimeout(function() {
            var slideInfo = $($("iframe")[0]).contents().find("#slide-info");
            console.log(slideInfo);
        }, 100);  
    };
    injectIframeContent();
    
    /* Allows all the messages to be on the console for debugging */
    var debugModeOn = true; 
    /* Prints the string out to the console depending on debug mode */
    var debugOut = function(str){
        if(debugModeOn){
            console.log(str);
        }
    };
    
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
       debugOut("Play!"); 
    });
    
    $(icons.up).click(function(){
       debugOut("up!"); 
    });
    
    $(icons.down).click(function(){
       debugOut("down!"); 
    });
    
    $(icons.stop).click(function(){
       debugOut("Play!"); 
    });
    
    $(icons.audio).click(function(){
       debugOut("audio!"); 
    });
    
    $(icons.save).click(function(){
       debugOut("save!"); 
    });
    
});