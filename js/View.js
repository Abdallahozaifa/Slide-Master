/* global slideController, $ */
/* View component that contains all the components neccessary for the visual elements of the web slide player */
var View = {

     audioTag: null, // element that will hold the audio to be played
     audioOn: false, // boolean value for the weather the audio is on or off

     playAudio: function() {
          if (this.audioTag != null) {
               this.audioOn = true;
               this.audioTag.play();
          }
     },

     pauseAudio: function() {
          if (this.audioTag != null) {
               this.audioOn = false;
               this.audioTag.pause();
          }
     },
     /* hides the audio on icon*/
     hideAudioOnIcon: function() {
          $(slideController.audioOn).hide();
     },

     /* hides the audio off icon*/
     hideAudioOffIcon: function() {
          $(slideController.audioOff).hide();
     },

     /* shows the audio on icon*/
     showAudioOnIcon: function() {
          $(slideController.audioOn).show();
     },

     /* shows the audio off icon*/
     showPlayIcon: function() {
          $(slideController.play).show();
     },

     /* hides the audio on icon*/
     hidePlayIcon: function() {
          $(slideController.play).hide();
     },

     /* hides the audio off icon*/
     hideStopIcon: function() {
          $(slideController.stop).hide();
     },

     /* shows the audio on icon*/
     showStopIcon: function() {
          $(slideController.stop).show();
     },

     /* shows the audio off icon*/
     showAudioOffIcon: function() {
          $(slideController.audioOff).show();
     },

     /* Changes the header info for the user */
     changeHeaderInfo: function(lecObj, slideNum) {
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
     },

     createAudioTag: function(lecObj, slideNum) {
          // if an audio url is specified (pageAudioURL property is not undefined)
          // then create the audio html element and insert it
          var audioURL = lecObj.pages[slideNum].pageAudioURL;
          if (audioURL != undefined && audioURL != "undefined") {
               View.audioTag = document.createElement("audio");
               View.audioTag.setAttribute('src', audioURL);

               // preload the audio file to prevent buffer lag
               View.audioTag.setAttribute('preload', 'auto');
          }
          else
               View.audioTag = null;
     },

     // Takes the position and size and returns an object with the new relative position
     // making the original position be the center of the object, rather than the distance 
     // from the edge. (Used to center image elements in the x-axis)
     findCenterPosition: function(size, position) {
          var newPos = position - (size / 2);
          newPos += "%";

          return newPos;
     },

     /* Creates the slide by creating the elements and appending it to the slide iframe */
     createSlide: function(lecObj, slideNum) {
          View.changeHeaderInfo(lecObj, slideNum); //Update the header contents

          // If a background color is specified, set the background color of the slideframe to it
          if (lecObj.pages[slideNum].background == "color") {
               $(slideController.getSlideFrame()).css("background-color", lecObj.pages[slideNum].backgroundcolor);
          }

          var entities = lecObj.pages[slideNum].entities; //Extract and iterate through entities

          View.createAudioTag(lecObj, slideNum); // creates the audio tag object
          if (View.audioOn && View.audioTag != null)
               View.audioTag.play();

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
                    if (entity.textFormat != undefined) {
                         elt.css("font-weight", entity.textFormat);
                    }
               }
               else if (entity.entityType == "image") {
                    elt = $("<img></img>").attr('src', entity.entityContent);
                    var leftPos = View.findCenterPosition(entity.entityWidth, entity.entityLocation.x);

                    elt.css("position", "fixed");
                    elt.css("left", leftPos);
                    elt.css("top", entity.entityLocation.y + "%");
                    elt.css("width", entity.entityWidth + "%");
               }

               $(slideController.getSlideFrame()).append(elt); //Append the element

               //Style/Position element
          });
     },


     /* Gets iframe contents if any control variables are null */
     checkContents: function() {
          if (slideController.noteInput == undefined)
               slideController.noteInput = slideController.getNoteInput();
          if (slideController.addBtn == undefined)
               slideController.addBtn = slideController.getAddNoteBtn();
          if (slideController.noteArea == undefined)
               slideController.noteArea = slideController.getNoteArea();
          if (slideController.slideInfo == undefined)
               slideController.slideInfo = slideController.getSlideFrame();
     },

     /* Changes the current slide */
     changeSlide: function(command) {
          if (View.audioTag != null)
               View.audioTag.pause(); // Pause audio tag to prevent it to keep on play and to leak memory

          (command == "prev") && (slideController.curSlideNum < slideController.SLIDEMAX - 1) ? slideController.curSlideNum++: null;
          (command == "next") && (slideController.curSlideNum > slideController.SLIDEMIN) ? slideController.curSlideNum--: null;
          View.createSlide(slideController.lecture, slideController.curSlideNum);
     },

     //Adds button handlers to the buttons in the note input area
     initNoteBtnHandlers: function() {
          this.addNoteBtnHandler();
          this.editNoteBtnHandler();
          this.doneNoteBtnHandler();
          this.clearNoteBtnHandler();
     },

     /* Clears the notes from the current slide */
     clearNoteBtnHandler: function() {
          var clearNoteButton = slideController.getClearNoteBtn();

          /* Clear note button handler which clears the content and saves the notes */
          clearNoteButton.click(function() {
               slideController.clearNoteContent();
               slideController.saveNotes(slideController.lecture);
          });
     },

     //Registers the event handler for the edit button in the note input area
     editNoteBtnHandler: function() {
          var editNoteButton = slideController.getEditNoteBtn();
          var doneNoteButton = slideController.getDoneNoteBtn();
          editNoteButton.click(function() {
               //other buttons are disabled
               slideController.getAddNoteBtn().prop('disabled', true);
               slideController.getClearNoteBtn().prop('disabled', true);

               //Edit button is replaced by the done button
               editNoteButton.prop('hidden', true);
               doneNoteButton.prop('hidden', false);

               //Prepend a checkbox before each element -- these boxes are grouped
               slideController.getNoteElements().each(function(i, val) {
                    console.log($("#" + i));
                    if ($("#" + i).length == 0) {
                         //Create a checkbox
                         $('<input />', {
                                   type: 'checkbox',
                                   id: i
                              }) //Assign the id attribute its index in relation to all other checkboxes
                              .insertBefore($(val));
                    }

               });
          });
     },
     //Registers the event handler for the done button in the note input area
     doneNoteBtnHandler: function() {
          //Get the edit and done buttons
          var editNoteButton = slideController.getEditNoteBtn();
          var doneNoteButton = slideController.getDoneNoteBtn();

          doneNoteButton.click(function() {
               //Enable other buttons in the note input area
               slideController.getAddNoteBtn().prop('disabled', false);
               slideController.getClearNoteBtn().prop('disabled', false);

               //Switch edit and done buttons so that edit is shown
               editNoteButton.prop('hidden', false);
               doneNoteButton.prop('hidden', true);

               //Select all checkboxes that are checked
               var boxes = slideController.getNoteArea().find(":checked");

               var noteElements = slideController.getNoteElements(); //Select all <p> in note display area
               var lecNotes = slideController.getLecNotes(); //Get the lecture note object from the JSON file

               //Delete all indices corresponding to the id of the checked boxes
               boxes.each(function(i, val) {
                    var index = $(val).attr("id");
                    noteElements[index].remove();

                    //Remove the same index from the notes element in lecture object
                    slideController.lecture.pages[slideController.curSlideNum].notes.splice(index, 1);
               });

               //Update notes
               slideController.syncNotes();
               slideController.saveNotes(slideController.lecture);

               //Remove all the checkboxes from beside the notes
               slideController.getDeleteCheckBoxes().each(function(i, val) {
                    val.remove();
               });
          });
     },
     /* Adds the handler for the add note button */
     addNoteBtnHandler: function() {
          var noteBtn = slideController.getAddNoteBtn();

          /* Click handler for the adding notes button */
          noteBtn.on("click", function() {
               var noteArea = slideController.getNoteArea();
               var usrNote = slideController.getNoteInput();
               var lecNotes = slideController.lecture.pages[slideController.curSlideNum].notes;

               /* Detect if the user has entered text in the input field */
               if (usrNote.val() != "") {

                    /* Updates the lecture object with the users notes */
                    slideController.lecture.pages[slideController.curSlideNum].notes.push(usrNote.val());

                    /* Synchronizes the old lecture object with the new one */
                    slideController.syncNotes();

                    /* Updated lecture object that is sent over to the server */
                    var updatedLecObj = slideController.lecture;

                    /* Saves the notes */
                    slideController.saveNotes(updatedLecObj);

                    /* Updates the note area with users text and emptys the input textfield for new notes */
                    /* Updates the note area with users text and emptys the input textfield for new notes */
                    noteArea.append($("<p></p>").text(usrNote.val()));
                    usrNote.val('');
               }
          });
     }
};