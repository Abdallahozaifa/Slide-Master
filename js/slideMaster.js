$(document).ready(function() {

    var debugModeOn = true;
    /* Prints the string out to the console depending on debug mode */
    var debugOut = function(str) {
        if (debugModeOn) {
            console.log(str);
        }
    };

    /* Hides the audio on icon */
    $(slideController.audioOn).hide();

    /* Gets iframe contents if any control variables are null */
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

    /* Changes the header info for the user */
    var changeHeaderInfo = function(lecObj, slideNum) {
        /* Sets the headers back to the default when slide player is turned off */
        if (lecObj == null && slideNum == null) {
            slideController.courseTitle.text("Welcome to Slide Master!");
            slideController.lecTitle.text("Slide Player");
            slideController.slideNumber.text(" Slide Number");
            slideController.getSlideFrame().css('background-color', 'black');
            slideController.getNoteArea().text("");
        }
        else {
            slideController.courseTitle.text(lecObj.courseTitle);
            slideController.lecTitle.text(lecObj.lectureTitle + " ");
            slideController.slideNumber.text("Slide " + lecObj.pages[slideNum].pageID);
        }
    };

    // Takes the position and size and returns an object with the new relative position
    // making the original position be the center of the object, rather than the distance 
    // from the edge. (Used to center image elements in the x-axis)
    var findCenterPosition = function(size, position) {
        var newPos = position - (size / 2);
        newPos += "%";

        return newPos;
    }

    /* Creates the slide by creating the elements and appending it to the slide iframe */
    var createSlide = function(lecObj, slideNum) {
        changeHeaderInfo(lecObj, slideNum); //Update the header contents

        var entities = lecObj.pages[slideNum].entities; //Extract and iterate through entities

        entities.forEach(function(entity, j, entities) {
            var elt;

            //Create the appropriate html object for each element (header, text, image)
            //Need to handle how images are stored?
            if (entity.entityType == "header") {
                elt = $("<h1></h1>").text(entity.entityContent);
                elt.css("top", entity.entityLocation.y + "%");
                elt.css("position", "fixed");
                elt.css("width", "100%");
                elt.css("text-align", "center");
            }
            else if (entity.entityType == "text") {
                elt = $("<p></p>").text(entity.entityContent);
                elt.css("position", "fixed");
                elt.css("top", entity.entityLocation.y + "%");
                elt.css("left", entity.entityLocation.x + "%");
            }
            else if (entity.entityType == "image") {
                elt = $("<img></img>").attr('src', entity.entityContent);
                var leftPos = findCenterPosition(entity.entityWidth, entity.entityLocation.x);

                elt.css("position", "fixed");
                elt.css("left", leftPos);
                elt.css("top", entity.entityLocation.y + "%");
                elt.css("width", entity.entityWidth + "%");
            }

            $(slideController.getSlideFrame()).append(elt); //Append the element

            //Style/Position element
        });

    };

    /* Changes the current slide */
    var changeSlide = function(command) {
        (command == "prev") && (slideController.curSlideNum < slideController.SLIDEMAX - 1) ? slideController.curSlideNum++: null;
        (command == "next") && (slideController.curSlideNum > slideController.SLIDEMIN) ? slideController.curSlideNum--: null;
        createSlide(slideController.lecture, slideController.curSlideNum);
    };

    /* Loads the notes and appends it to the notes section */
    var loadNotes = function() {
        $.get("/loadLecture", function(lecture) {
            slideController.lecture = lecture;
            var noteArea = slideController.getNoteArea();
            var usrNote = slideController.getNoteInput();
            var curSlide = slideController.curSlideNum;
            var notes = slideController.lecture.pages[curSlide].notes;
            noteArea.html(notes);
        });
    };

    /* Sending the newly update lecture object back to the server */
    var saveNotes = function(lecture) {
        $.ajax({
            url: "/saveNote",
            type: "POST",
            data: JSON.stringify(lecture),
            contentType: "application/json",
            complete: function(res) {
                debugOut(res);
            }
        });
    };
    /* Adds the handler for the add note button */
    var addNoteBtnHandler = function() {
        var noteBtn = slideController.getAddNoteBtn();

        /* Click handler for the adding notes button */
        noteBtn.on("click", function() {
            var noteArea = slideController.getNoteArea();
            var usrNote = slideController.getNoteInput();
            var lecNotes = slideController.lecture.pages[slideController.curSlideNum].notes;

            /* Detect if the user has entered text in the input field */
            if (usrNote.val() != "") {

                /* Updates the lecture object with the users notes */
                if (lecNotes == "")
                    slideController.lecture.pages[slideController.curSlideNum].notes = usrNote.val();
                else
                    slideController.lecture.pages[slideController.curSlideNum].notes = "<br/>" + usrNote.val();

                /* Gets the Lecture JSON object */
                $.ajax({
                    url: "/loadLecture",
                    type: "GET",
                    success: function(lecture) {
                        var oldLecNotes = lecture.pages[slideController.curSlideNum].notes;
                        var newLecNotes = slideController.lecture.pages[slideController.curSlideNum].notes;
                        slideController.lecture.pages[slideController.curSlideNum].notes = oldLecNotes + newLecNotes;
                    },
                    async: false
                });

                /* Updated lecture object that is sent over to the server */
                var updatedLecObj = slideController.lecture;

                /* Saves the notes */
                saveNotes(updatedLecObj);

                /* Updates the note area with users text and emptys the input textfield for new notes */
                if (noteArea.text() == "")
                    noteArea.append(usrNote.val());
                else
                    noteArea.append("<br/>" + usrNote.val());

                usrNote.val('');
            }
        });
    };
    
    /* Clears the notes from the current slide */
    var clearNoteButtonHandler = function() {
        var clearNoteButton = slideController.getClearNoteBtn();
        
        /* Clearn note button handler which clears the content and saves the notes */
        clearNoteButton.click(function() {
            slideController.clearNoteContent();
            saveNotes(slideController.lecture);
        });
    };

    /* Icons click handlers for all the icons */
    $(slideController.play).click(function() {
        checkContents();
        slideController.clearSlideFrame();
        /*Opens presentation file from /resources/xxx.json*/
        $.get("/loadLecture", function(lecture) {
            /* Initializes the lecture object with the data that is sent back from the server */
            slideController.lecture = lecture;

            /* Creates the first slide */
            createSlide(lecture, 0);

            /* Obtains the note area from the previous notes */
            slideController.getNoteArea().html(slideController.lecture.pages[0].notes);

            /* Registers the Add Notes button handler */
            addNoteBtnHandler();
            
            /* Registers the clear notes button handler */
            clearNoteButtonHandler();
        });

        /* Turns ON the slide show */
        slideController.SLIDESHOW_ON = true;

        /* Changes the background color */
        slideController.getSlideFrame().css("background-color", "grey");

        /* Enables the Add note button */
        slideController.getAddNoteBtn().prop('disabled', false);

        /* Enables the clear note button */
        slideController.getClearNoteBtn().prop('disabled', false);
    });

    /* Proceeds to the next slide */
    $(slideController.up).click(function() {
        checkContents();
        slideController.clearSlideFrame();
        if (slideController.SLIDESHOW_ON) {
            changeSlide("prev");
            loadNotes();
        }
    });

    /* Moves back a slide */
    $(slideController.down).click(function() {
        checkContents();
        slideController.clearSlideFrame();
        if (slideController.SLIDESHOW_ON) {
            changeSlide("next");
            loadNotes();
        }
    });

    /* Closes the presentation */
    $(slideController.stop).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            slideController.SLIDESHOW_ON = false;
            slideController.slide = null;
            changeHeaderInfo(null, null);
            slideController.getAddNoteBtn().prop('disabled', true);
            slideController.getClearNoteBtn().prop('disabled', true);
        }
        slideController.clearSlideFrame();
    });

    /* Plays audio during the presentation */
    $(slideController.audioOff).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            slideController.audioOn.show();
            slideController.audioOff.hide();
            // Play audio
        }
    });

    /* Stops audio during the presentation */
    $(slideController.audioOn).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            slideController.audioOn.hide();
            slideController.audioOff.show();
            // Stop audio
        }
    });

    /* Saves the notes */
    $(slideController.save).click(function() {
        if (slideController.SLIDESHOW_ON) {
            saveNotes(slideController.lecture);
        }
    });

});
