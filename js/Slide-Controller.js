/* Slide Controller that contains all the slide componenets and getters necessary for controller the slide master */
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

     /* Selectors for the course title, lecture title, and current slide number*/
     courseTitle: $("#course-title"),
     lecTitle: $("#lecture-title"),
     slideNumber: $("#slide-number"),

     /* Icons for the web slide player */
     play: $("#webslideplayer > div > div > div > div.col-md-1.col-sm-6 > ul > div:nth-child(2) > i"),
     up: $("#webslideplayer > div > div > div > div.col-md-1.col-sm-6 > ul > div:nth-child(3) > i"),
     down: $("#webslideplayer > div > div > div > div.col-md-1.col-sm-6 > ul > div:nth-child(4) > i"),
     stop: $("#webslideplayer > div > div > div > div.col-md-1.col-sm-6 > ul > div:nth-child(5) > i"),
     audioOff: $("#webslideplayer > div > div > div > div.col-md-1.col-sm-6 > ul > div:nth-child(6) > i.fa.fa-volume-off.fa-5x"),
     audioOn: $("#webslideplayer > div > div > div > div.col-md-1.col-sm-6 > ul > div:nth-child(6) > i.fa.fa-volume-up.fa-5x"),
     save: $("#webslideplayer > div > div > div > div.col-md-1.col-sm-6 > ul > div:nth-child(8) > i"),

     /* Grabs the div element inside the first iframe */
     getSlideFrame: function() {
          return $($("iframe")[0]).contents().find("#slide-page");
     },

     /* Clear all contents within the slide frame */
     clearSlideFrame: function() {
          this.getSlideFrame().children().each(function(index, val) {
               val.remove();
          });
     },
     /* Grabs the note input textfield in the second iframe */
     getNoteInput: function() {
          return $($("iframe")[1]).contents().find("#noteContent");
     },
     /* Clears all the notes for the current slide*/
     clearNoteContent: function() {
          this.lecture.pages[this.curSlideNum].notes = "";
          this.getNoteArea().text("");
          console.log(this.lecture);
     },

     /* Grabs the add button next to the input field in the second iframe */
     getAddNoteBtn: function() {
          return $($("iframe")[1]).contents().find("#addNote");
     },
     /* Gets the clear button in the note input area*/
     getClearNoteBtn: function() {
          return $($("iframe")[1]).contents().find("#clearNote");
     },

     /* Grabs the note area that displays the notes in the third iframe */
     getNoteArea: function() {
          return $($("iframe")[2]).contents().find("#user-notes");
     }
};