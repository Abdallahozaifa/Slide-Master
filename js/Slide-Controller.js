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