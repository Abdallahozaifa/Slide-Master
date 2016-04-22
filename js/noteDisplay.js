/*
NOTE DISPLAY FUNCTION IMPLEMENTATION

CASES:
1. Displays notes
*/

$(document).ready(function() {
    /* Allows all the messages to be on the console for debugging */
    var debugModeOn = true;
    /* Prints the string out to the console depending on debug mode */
    var debugOut = function(str) {
        if (debugModeOn) {
            console.log(str);
        }
    };
    
    //$.get()
    
    var noteArea = $("#user-notes");
    out("Note Area is " + noteArea);
    
});