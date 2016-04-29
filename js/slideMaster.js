$(document).ready(function() {

    /* Hides the audio on icon */
    View.hideAudioOnIcon();
    $(slideController.stop).hide();

    /* Icons click handlers for all the icons */
    $(slideController.play).click(function() {
        View.checkContents();
        slideController.clearSlideFrame();
        /*Opens presentation file from /resources/xxx.json*/
        $.get("/loadLecture", function(lecture) {
            /* Initializes the lecture object with the data that is sent back from the server */
            slideController.lecture = lecture;

            /* Creates the first slide */
            View.createSlide(lecture, 0);

            /* Obtains the note area from the previous notes */
            slideController.getNoteArea().html(slideController.lecture.pages[0].notes);

            /* Registers the Add Notes button handler */
            View.addNoteBtnHandler();

            /* Registers the clear notes button handler */
            View.clearNoteButtonHandler();
        });

        /* Turns ON the slide show */
        slideController.SLIDESHOW_ON = true;

        /* Changes the background color */
        slideController.getSlideFrame().css("background-color", "grey");

        /* Enables the Add note button */
        slideController.getAddNoteBtn().prop('disabled', false);

        /* Enables the clear note button */
        slideController.getClearNoteBtn().prop('disabled', false);

        View.hidePlayIcon();
        View.showStopIcon();
    });

    /* Closes the presentation */
    $(slideController.stop).click(function() {
        View.checkContents();
        if (slideController.SLIDESHOW_ON) {
            slideController.SLIDESHOW_ON = false;
            slideController.slide = null;
            View.changeHeaderInfo(null, null);
            slideController.getAddNoteBtn().prop('disabled', true);
            slideController.getClearNoteBtn().prop('disabled', true);
            View.hideStopIcon();
            View.showPlayIcon();
        }
        slideController.clearSlideFrame();
    });
    
    /* Proceeds to the next slide */
    $(slideController.up).click(function() {
        View.checkContents();
        slideController.clearSlideFrame();
        if (slideController.SLIDESHOW_ON) {
            View.changeSlide("prev");
            slideController.loadNotes();
        }
    });

    /* Moves back a slide */
    $(slideController.down).click(function() {
        View.checkContents();
        slideController.clearSlideFrame();
        if (slideController.SLIDESHOW_ON) {
            View.changeSlide("next");
            slideController.loadNotes();
        }
    });

    /* Plays audio during the presentation */
    $(slideController.audioOff).click(function() {
        View.checkContents();
        if (slideController.SLIDESHOW_ON) {
            View.showAudioOnIcon();
            View.hideAudioOffIcon();
            View.playAudio();
        }
    });

    /* Stops audio during the presentation */
    $(slideController.audioOn).click(function() {
        View.checkContents();
        if (slideController.SLIDESHOW_ON) {
            View.hideAudioOnIcon();
            View.showAudioOffIcon();
            View.pauseAudio();
        }
    });

    /* Saves the notes */
    $(slideController.fullScreen).click(function() {
        if (slideController.SLIDESHOW_ON) {
            slideController.saveNotes(slideController.lecture);
        }
    });

    /* Prevent form submission for add button */
    slideController.getAddNoteBtn().click(function(event) {
        event.preventDefault();
    });

    /* Prevent form submission for clear button */
    slideController.getClearNoteBtn().click(function(event) {
        event.preventDefault();
    });
});
