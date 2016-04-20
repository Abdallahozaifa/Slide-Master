/*

NOTE FUNCTION IMPLEMENTATION

CASES:

Read existing notes from server and display

Append notes to existing area

Update server notes on slide change
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
    var noteBtn = $("#addNote");
    var appendNote = function() {
        var input = $("#noteContent"); //Select the input area
        var inputContent = input.val();

        debugOut("Input Content is " + inputContent);
        //The file that is to be opened
        var file = $('#noteInterface', parent.document).attr("fileName");
        var page = $('#noteInterface', parent.document).attr("slideNumber");

        debugOut("File is " + file);
        debugOut("Page is " + page);
        //Fill data as a json object with fields note and file
        var data = {
            "note": inputContent,
            "filename": file
        };

        debugOut("Note sent to the server " + data.note);
        debugOut("FileName sent to the server " + data.filename);
        debugOut("Stringified data is " + JSON.stringify(data));

        $.ajax({
            url: "/SlideMaster/addNote",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        });

        input.val(''); //Clear the contents of the input area
    };

    $(noteBtn).on("click", function() {
        appendNote();
    });
});
