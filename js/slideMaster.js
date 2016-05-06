/* global slideController, $, View*/
$(document).ready(function() {

    /* Hides the audio on icon */
    View.hideAudioOnIcon();
    $(slideController.stop).hide();

    /* Icons click handlers for all the icons */
    $(slideController.play).click(function() {
        View.checkContents();
        slideController.clearSlideFrame();
        /*Opens presentation file from /resources/xxx.json*/
        slideController.loadInitLec();

        /* Turns ON the slide show */
        slideController.SLIDESHOW_ON = true;

        /* Changes the background color */
        slideController.getSlideFrame().css("background-color", "grey");

        //Enables all buttons in the note input area
        slideController.enableNoteButtons();

        View.hidePlayIcon();
        View.showStopIcon();
    });

    /* Closes the presentation */
    $(slideController.stop).click(function() {
        View.checkContents();
        if (slideController.SLIDESHOW_ON) {
            slideController.SLIDESHOW_ON = false;   //Disable the slide show being active
            slideController.slide = null;           //Remove the lecture object within our instance of slideController
            View.changeHeaderInfo(null, null);      //Resets the lecture title and slide number above the player area
            slideController.disableNoteButtons();   //Disables the buttons in the note input area
            View.hideStopIcon();    //Remove the stop button from view
            View.showPlayIcon();    //Replace stop button with play button
        }
        slideController.clearSlideFrame();
    });
    
    /* Proceeds to the next slide */
    $(slideController.up).click(function() {
        View.checkContents();
        slideController.clearSlideFrame();
        if (slideController.SLIDESHOW_ON) {
            View.changeSlide("prev");
            slideController.clearNoteDisplay();
            slideController.loadNotes();
        }
    });

    /* Moves back a slide */
    $(slideController.down).click(function() {
        View.checkContents();
        slideController.clearSlideFrame();
        if (slideController.SLIDESHOW_ON) {
            View.changeSlide("next");
            slideController.clearNoteDisplay();
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

    /*  */
    $(slideController.fullScreen).click(function() {
        if (slideController.SLIDESHOW_ON) {
            slideController.toggleFullScreen();
            // console.log($("#lecture-title"));
            // $(window).scrollTo("#lecture-title");
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


