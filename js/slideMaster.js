/* Global Space */
var noteInput; //The text field users can add notes via
var addBtn; //Button pressed to append note input to notes
var noteArea; //Area notes are displayed in
var slideInfo; //The slide dislay iframe
var lecture; // lecture object that contains all the slides
var curSlideNum = 0; // current slide number that represents the current slide
var SLIDEMIN = 0; // minimum slide number constant 
var SLIDEMAX = 10; // maximum slide number constant
var SLIDESHOW_ON = false; // wether the slide show is on or not

$(document).ready(function() {
    
    var debugModeOn = true;
    /* Prints the string out to the console depending on debug mode */
    var debugOut = function(str) {
        if (debugModeOn) {
            console.log(str);
        }
    };

    /* Iframe Components object that contains the get methods neccessary to grab the components*/
    var iframeComps = {
        /* Grabs the div element inside the first iframe */
        getSlideFrame: function() {
            return $($("iframe")[0]).contents().find("#slide-page");
        },
        /* Grabs the note input textfield in the second iframe */
        getNoteInput: function() {
            return $($("iframe")[1]).contents().find("#noteContent");
        },

        /* Grabs the add button next to the input field in the second iframe */
        getAddNoteBtn: function() {
            return $($("iframe")[1]).contents().find("#addNote");
        },

        /* Grabs the note area that displays the notes in the third iframe */
        getNoteArea: function() {
            return $($("iframe")[2]).contents().find("#user-notes");
        }
    };

    //Gets iframe contents if any control variables are null
    var checkContents = function() {
        if (noteInput == undefined)
            noteInput = iframeComps.getNoteInput();
        if (addBtn == undefined)
            addBtn = iframeComps.getAddNoteBtn();
        if (noteArea == undefined)
            noteArea = iframeComps.getNoteArea();
        if (slideInfo == undefined)
            slideInfo = iframeComps.getSlideFrame();
    };

    /* Prints the frame contents to check it grabbed it correctly */
    var printFrameContents = function() {
        debugOut(noteInput);
        debugOut(addBtn);
        debugOut(noteArea);
        debugOut(slideInfo);
    };

    /* Page header object that contains the course title, lecture title, and current slide number */
    var pageHeader = {
        courseTitle: $("#course-title"),
        lecTitle: $("#lecture-title"),
        slideNumber: $("#slide-number")
    };

    /* Changes the header info for the user */
    var changeHeaderInfo = function(lecObj, slideNum) {
        pageHeader.courseTitle.text(lecObj.courseTitle);
        pageHeader.lecTitle.text(lecObj.lectureTitle + " ");
        pageHeader.slideNumber.text("Slide " + lecObj.pages[slideNum].pageID);
    };

    /* Creates the slide by creating the elements and appending it to the slide iframe */
    var createSlide = function(lecObj, slideNum) {
        changeHeaderInfo(lecObj, slideNum);
    };

    /* Changes the current slide */
    var changeSlide = function(command) {
        (command == "next") && (curSlideNum < SLIDEMAX - 1) ? curSlideNum++ : null;
        (command == "prev") && (curSlideNum > SLIDEMIN) ? curSlideNum-- : null;
        createSlide(lecture, curSlideNum);
    };
    // checkContents();

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
    $(icons.play).click(function() {
        checkContents();
        /*Opens presentation file from /resources/xxx.json*/
        $.getJSON("resources/lecture.json", function(data) {
            lecture = data;
            createSlide(data, 0);
        });
        SLIDESHOW_ON = true;
    });

    /* Proceeds to the next slide */
    $(icons.up).click(function() {
        checkContents();
        if(SLIDESHOW_ON){
            changeSlide("next");
        }
    });

    /* Moves back a slide */
    $(icons.down).click(function() {
        checkContents();
        if(SLIDESHOW_ON){
            changeSlide("prev");
        }
    });

    /* Closes the presentation */
    $(icons.stop).click(function() {
        checkContents();
        SLIDESHOW_ON = false;
    });


    /* Plays audio during the presentation */
    $(icons.audio).click(function() {
        checkContents();
    });

    /* Saves the notes */
    $(icons.save).click(function() {
        checkContents();
    });

    //Event handler for the add note button
    //Takes contents of note input area and appends to the note 
    //data object for the current lecture
    // addBtn.on("click", function() {
    //     if (lecture != null) {
    //         noteArea.val(noteInput);
    //     }
    //     noteArea.val('');
    // });
});
