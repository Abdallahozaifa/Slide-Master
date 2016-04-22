$(document).ready(function() {

    var debugModeOn = true;
    /* Prints the string out to the console depending on debug mode */
    var debugOut = function(str) {
        if (debugModeOn) {
            console.log(str);
        }
    };

    //Gets iframe contents if any control variables are null
    var checkContents = function() {
        if (slideController.noteInput == undefined)
            slideController.noteInput = slideController.getNoteInput();
        if (slideController.addBtn == undefined)
            slideController.addBtn = slideController.getAddNoteBtn();
        if (slideController.noteArea == undefined)
            slideController.noteArea = slideController.getNoteArea();
        if (slideController.slideInfo == undefined)
            slideController.slideInfo = slideController.getSlideFrame();
    };

    /* Prints the frame contents to check it grabbed it correctly */
    var printFrameContents = function() {
        debugOut(slideController.noteInput);
        debugOut(slideController.addBtn);
        debugOut(slideController.noteArea);
        debugOut(slideController.slideInfo);
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
        (command == "next") && (slideController.curSlideNum < slideController.SLIDEMAX - 1) ? slideController.curSlideNum++ : null;
        (command == "prev") && (slideController.curSlideNum > slideController.SLIDEMIN) ? slideController.curSlideNum-- : null;
        createSlide(slideController.lecture, slideController.curSlideNum);
    };
    
    /* Adds the handler for the add note button */
    var addNoteBtnHandler = function() {
        var noteBtn = slideController.getAddNoteBtn();
        var noteArea = slideController.getNoteArea();
        var usrNote = slideController.getNoteInput();
        
        noteBtn.on("click", function() {
            noteArea.text(usrNote.val());
            usrNote.val('');
        });
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
    $(icons.play).click(function() {
        checkContents();
        /*Opens presentation file from /resources/xxx.json*/
        $.getJSON("resources/lecture.json", function(data) {
            slideController.lecture = data;
            createSlide(data, 0);
        });
        /* Turns ON the slide show */
        slideController.SLIDESHOW_ON = true;
        
        /* Changes the background color */
        slideController.getSlideFrame().css("background-color", "grey");
        
        /*Registers the Add Notes button handler */
        addNoteBtnHandler();
    });

    /* Proceeds to the next slide */
    $(icons.up).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            changeSlide("next");
        }
    });

    /* Moves back a slide */
    $(icons.down).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            changeSlide("prev");
        }
    });

    /* Closes the presentation */
    $(icons.stop).click(function() {
        checkContents();
        slideController.SLIDESHOW_ON = false;
    });


    /* Plays audio during the presentation */
    $(icons.audio).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            // trigger audio
        }
    });

    /* Saves the notes */
    $(icons.save).click(function() {
        if (slideController.SLIDESHOW_ON) {
            // save the notes 
        }
    });
});
