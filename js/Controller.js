/* global $, View, Element */
/* Slide Controller that contains all the slide components neccessary to control the slide master */
var slideController = {

     _this: this,
     /* Slide Components */
     noteInput: null, //The text field users can add notes via
     addBtn: null, //Button pressed to append note input to notes
     noteArea: null, //Area notes are displayed in
     slideInfo: null, //The slide dislay iframe
     lecture: null, // lecture object that contains all the slides
     curSlideNum: 0, // current slide number that represents the current slide
     SLIDEMIN: 0, // minimum slide number constant 
     SLIDEMAX: 3, // maximum slide number constant
     SLIDESHOW_ON: false, // whether the slide show is on or not
     debugModeOn: false, // weather debug mode is on or off

     /* client side cache for lecture object */
     cache: {
          lec: null
     },

     /* Selectors for the course title, lecture title, and current slide number*/
     courseTitle: $("#course-title"),
     lecTitle: $("#lecture-title"),
     slideNumber: $("#slide-number"),
     playerIframe: $("#slideMaster"),

     /* Icons for the web slide player */
     play: $("#play-icon"),
     up: $("#up-icon"),
     down: $("#down-icon"),
     stop: $("#stop-icon"),
     audioOff: $("#volume-off-icon"),
     audioOn: $("#volume-on-icon"),
     fullScreen: $("#full-screen-icon"),

     /* Prints the string out to the console depending on debug mode */
     debugOut: function(str) {
          if (this.debugModeOn) {
               console.log(str);
          }
     },

     /* Grabs the div element inside the first iframe */
     getSlideFrame: function() {
          return $($("iframe")[0]).contents().find("#slide-page");
     },

     /* Grabs the note input textfield in the second iframe */
     getNoteInput: function() {
          return $("#user-input");
     },
     /* Returns all buttons in the note input area */
     getNoteButtons: function() {
          return $(".slide-button");
     },

     /* Grabs the add button next to the input field in the second iframe */
     getAddNoteBtn: function() {
          return $("#addNote");
     },

     /* Gets the clear button in the note input area*/
     getClearNoteBtn: function() {
          return $("#clearNote");
     },
     /* Gets the edit button in the note input area*/
     getEditNoteBtn: function() {
          return $("#editNote");
     },
     /* Gets the done button in the note input area*/
     getDoneNoteBtn: function() {
          return $("#doneNote");
     },
     /* Grabs the note area that displays the notes in the third iframe */
     getNoteArea: function() {
          return $(".notes-shown");
     },

     //Gets the note variable from the lecture object
     getLecNotes: function() {
          return slideController.lecture.pages[slideController.curSlideNum].notes;
     },

     /* Gets the div elements containing notes in the note display area*/
     getNoteElements: function() {
          return slideController.getNoteArea().find("p");
     },
     /* Returns the set of checkboxes next to each note element */
     getDeleteCheckBoxes: function() {
          return slideController.getNoteArea().find(":checkbox");
     },
     /* Clear all contents within the slide frame */
     clearSlideFrame: function() {
          this.getSlideFrame().children().each(function(index, val) {
               val.remove();
          });
     },

     /* Clears all the notes for the current slide*/
     clearNoteContent: function() {
          this.lecture.pages[this.curSlideNum].notes = [];
          this.getNoteArea().find("p").remove();
     },
     //Clears elements from the note display without altering notes in the lecture object
     clearNoteDisplay: function() {
          this.getNoteArea().find("p").remove();
     },
     /* Enables the buttons in the note input area*/
     enableNoteButtons: function() {
          slideController.getNoteButtons().each(function(i, val) {
               $(val).prop('disabled', false);
          });
     },
     /* Disables the buttons in the note input area*/
     disableNoteButtons: function() {
          slideController.getNoteButtons().each(function(i, val) {
               $(val).prop('disabled', true);
          });
     },

     /* Sending the newly update lecture object back to the server */
     saveNotes: function(lecture) {
          var _this = this;
          var currentSlideNum = _this.curSlideNum;
          lecture.currentSlideNum = currentSlideNum;
          $.ajax({
               url: "/saveNote",
               type: "POST",
               data: JSON.stringify(lecture),
               contentType: "application/json",
               complete: function(res) {
                    // cache it here
               },
               dataType: 'json'
          });
     },

     /* Synchronizes the old Lecture JSON object with the new one */
     syncNotes: function(lecture) {
          var oldLecNotes = lecture.pages[slideController.curSlideNum].notes;
          var newLecNotes = slideController.lecture.pages[slideController.curSlideNum].notes;
          newLecNotes = newLecNotes.filter(function(val) {
               return oldLecNotes.indexOf(val) == -1;
          });
     },

     /* Starts the slide show by initially creating the first slide and initializing the client side lecture object */
     startSlideShow: function(lecture) {
          /* Initializes the lecture object with the data that is sent back from the server */
          slideController.lecture = lecture;

          /* Creates the first slide */
          View.createSlide(lecture, 0);

          /* Updates the note area to display notes for the first slide */
          $(slideController.lecture.pages[0].notes).each(function(i, val) {
               $("<p></p>").text(val).appendTo(slideController.getNoteArea());
          });


          /* Registers button handlers for buttons in the note input area */
          View.initNoteBtnHandlers();
     },

     /* Append notes callback function that executes once the lecture object returns */
     appendNotes: function(lecture) {
          slideController.lecture = lecture;
          var curSlide = slideController.curSlideNum;
          var notes = slideController.lecture.pages[curSlide].notes;
          $(notes).each(function(i, val) {
               $("<p></p>").text(val).appendTo(slideController.getNoteArea());
          });
     },

     /* A general function for loading the lecture object */
     loadLec: function(asyncOpt, callback) {
          if (!this.cache.lec) {
               this.cache.lec =
                    $.ajax({
                         url: "/loadLecture",
                         type: "GET",
                         success: callback,
                         async: asyncOpt
                    }).promise();
          }
          this.cache.lec.done(callback);
     },

     /* Toggles the full screen mode */
     toggleFullScreen: function() {
          if ((document.fullScreenElement && document.fullScreenElement !== null) ||
               (!document.mozFullScreen && !document.webkitIsFullScreen)) {
               if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
               }
               else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
               }
               else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
               }
          }
          else {
               if (document.cancelFullScreen) {
                    document.cancelFullScreen();
               }
               else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
               }
               else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
               }
          }
     }
};