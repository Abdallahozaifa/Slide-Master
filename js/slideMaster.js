/* global slideController, $, View*/
$(document).ready(function() {

    /* Hides the audio on icon */
    View.hideAudioOnIcon();
    $(slideController.stop).hide();
    
    /* Waits until the elements are loaded then changes the background color of the slide to black */
    setTimeout(function() {
        View.changeBgColor("black", "on");
    }, 800);

    /* Icons click handlers for all the icons */
    $(slideController.play).click(function() {
        View.checkContents();
        slideController.clearSlideFrame();
        /* Opens presentation file from /resources/xxx.json*/
        slideController.loadLec(false, slideController.startSlideShow);

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

        /* Detects wether the slide show is on */
        if (slideController.SLIDESHOW_ON) {
            View.changeBgColor("black", "off");
            slideController.SLIDESHOW_ON = false; //Disable the slide show from being active
            slideController.slide = null; //Remove the lecture object within our instance of slideController
            View.changeHeaderInfo(null, null); //Resets the lecture title and slide number above the player area
            slideController.disableNoteButtons(); //Disables the buttons in the note input area
            View.hideStopIcon(); //Remove the stop button from view
            View.showPlayIcon(); //Replace stop button with play button
        }
        slideController.clearSlideFrame();
    });

    /* Proceeds to the next slide */
    $(slideController.up).click(function() {
        View.checkContents();

        /* If the user clicks past the slide show boundary don't continue to recreate the slide */
        if (slideController.curSlideNum < slideController.SLIDEMAX - 1) {
            slideController.clearSlideFrame();

            /* Detects wether the slide show is on */
            if (slideController.SLIDESHOW_ON) {
                View.changeSlide("next"); // proceeds to the next slide
                slideController.clearNoteDisplay(); // clears the node display

                /* loads the lecture object with the append notes callback */
                slideController.loadLec(true, slideController.appendNotes);
            }
        }
    });

    /* Moves back a slide */
    $(slideController.down).click(function() {
        View.checkContents();

        /* If the user clicks past the slide show boundary don't continue to recreate the slide */
        if (slideController.curSlideNum != slideController.SLIDEMIN) {
            slideController.clearSlideFrame();

            /* Detects wether the slide show is on */
            if (slideController.SLIDESHOW_ON) {
                View.changeSlide("prev"); // proceeds to the previous slide
                slideController.clearNoteDisplay(); // clears the note display

                /* loads the lecture object with the append notes callback */
                slideController.loadLec(true, slideController.appendNotes);
            }
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

    /* Turns the mode into fullscreen */
    $(slideController.fullScreen).click(function() {
        if (slideController.SLIDESHOW_ON) {
            slideController.toggleFullScreen();
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
