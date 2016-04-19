var currentSlide = 1;
var lectureObject;

$(document).ready(function(){
    
    // default lecture url
    var url = "resources/lecture";
    // open the lecture url and render to iframe
    openLecture(url);
    
    var injectIframeContent = function(){
        setTimeout(function() {
            var slideInfo = $($("iframe")[0]).contents().find("#slide-info");
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
       debugOut("Stop!"); 
    });
    
    $(icons.audio).click(function(){
       debugOut("audio!"); 
    });
    
    $(icons.save).click(function(){
       debugOut("save!"); 
    });
    
});

function openLecture(url) {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            lectureObject = JSON.parse(xmlhttp.responseText);
            renderLecture(lectureObject);
        }
        
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    // update note interface filename tag to know where notes are being saved 
    document.getElementById("noteInterface").setAttribute("fileName", url);
    document.getElementById("noteInterface").setAttribute("slideNumber", currentSlide);

}

function renderLecture(lectureObject) {
    if (lectureObject.pages.length >= currentSlide) {
        renderPage(lectureObject.pages[currentSlide-1]);
    }
}

function renderPage(pageObject) {
    debugOut('Page to be rendered: ' + pageObject);
}