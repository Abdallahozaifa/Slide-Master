/*

NOTE FUNCTION IMPLEMENTATION

CASES:

Read existing notes from server and display

Append notes to existing area

Update server notes on slide change
*/



$().ready(function(){
    var noteBtn = $("#addNote");
    
    $(noteBtn).on("click", function(){
       appendNote();
        //console.log(inputContents);
        
    });
});



function appendNote(){
    var input = $("#noteContent");    //Select the input area
    var inputContent = input.val();
    
    //The file that is to be opened
    var file = $('#noteInterface', parent.document).attr("filename");
    var page = $('#noteInterface', parent.document).attr("page");
    
    //Fill data as a json object with fields note and file
    var data = {
        "note": inputContent,
        "file": file
    };
    
    
    $.post("/SlideMaster/addNote", data, function(e){
        
    }, "json");
    
    input.val('');//Clear the contents of the input area
    
    //Update the note area with the additional note
}
