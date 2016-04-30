/* global $*/
/* Slide Controller that contains all the slide components neccessary to control the slide master */
var slideController = {

     /* Slide Components */
     noteInput: null, //The text field users can add notes via
     addBtn: null, //Button pressed to append note input to notes
     noteArea: null, //Area notes are displayed in
     slideInfo: null, //The slide dislay iframe
     lecture: null, // lecture object that contains all the slides
     curSlideNum: 0, // current slide number that represents the current slide
     SLIDEMIN: 0, // minimum slide number constant 
     SLIDEMAX: 10, // maximum slide number constant
     SLIDESHOW_ON: false, // whether the slide show is on or not
     debugModeOn: true, // weather debug mode is on or off

     /* Selectors for the course title, lecture title, and current slide number*/
     courseTitle: $("#course-title"),
     lecTitle: $("#lecture-title"),
     slideNumber: $("#slide-number"),

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
          return $("body > div:nth-child(3) > div > form > ul > li.notes-area > textarea");
     },

     /* Grabs the add button next to the input field in the second iframe */
     getAddNoteBtn: function() {
          return $("body > div:nth-child(3) > div > form > ul > li:nth-child(2) > input[type='submit']:nth-child(1)");
     },

     /* Gets the clear button in the note input area*/
     getClearNoteBtn: function() {
          return $("body > div:nth-child(3) > div > form > ul > li:nth-child(2) > input[type='submit']:nth-child(2)");
     },

     /* Grabs the note area that displays the notes in the third iframe */
     getNoteArea: function() {
          return $("body > div.row-fluid > div.col-md-3.notes > div > ul > li.notes-display > div");
     },

     /* Clear all contents within the slide frame */
     clearSlideFrame: function() {
          this.getSlideFrame().children().each(function(index, val) {
               val.remove();
          });
     },

     /* Clears all the notes for the current slide*/
     clearNoteContent: function() {
          this.lecture.pages[this.curSlideNum].notes = "";
          this.getNoteArea().text("");
     },

     /* Loads the notes and appends it to the notes section */
     loadNotes: function() {
          var _this = this;
          $.get("/loadLecture", function(lecture) {
               _this.lecture = lecture;
               var noteArea = _this.getNoteArea();
               var curSlide = _this.curSlideNum;
               var notes = _this.lecture.pages[curSlide].notes;
               noteArea.html(notes);
          });
     },

     /* Sending the newly update lecture object back to the server */
     saveNotes: function(lecture) {
          var _this = this;
          $.ajax({
               url: "/saveNote",
               type: "POST",
               data: JSON.stringify(lecture),
               contentType: "application/json",
               complete: function(res) {
                    _this.debugOut(res);
               }
          });
     },

     /* Synchronizes the old Lecture JSON object with the new one*/
     syncNotes: function() {
          var _this = this;
          $.ajax({
               url: "/loadLecture",
               type: "GET",
               success: function(lecture) {
                    var oldLecNotes = lecture.pages[_this.curSlideNum].notes;
                    var newLecNotes = _this.lecture.pages[_this.curSlideNum].notes;
                    _this.lecture.pages[_this.curSlideNum].notes = oldLecNotes + newLecNotes;
               },
               async: false
          });
     }
};