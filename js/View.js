/* View component that contains all the components neccessary for the visual elements of the web slide player */
var View = {

     audioTag: null, // element that will hold the audio to be played
     audioOn: false, // boolean value for the weather the audio is on or off

     playAudio: function() {
          this.audioOn = true;
          this.audioTag.play();
     },

     pauseAudio: function() {
          this.audioOn = false;
          this.audioTag.pause();
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

     /* Clears the notes from the current slide */
     clearNoteButtonHandler: function() {
          var clearNoteButton = slideController.getClearNoteBtn();

          /* Clearn note button handler which clears the content and saves the notes */
          clearNoteButton.click(function() {
               slideController.clearNoteContent();
               slideController.saveNotes(slideController.lecture);
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
                    if (lecNotes == "")
                         slideController.lecture.pages[slideController.curSlideNum].notes = usrNote.val();
                    else
                         slideController.lecture.pages[slideController.curSlideNum].notes = "<br/>" + usrNote.val();

                    /* Synchronizes the old lecture object with the new one */
                    slideController.syncNotes();

                    /* Updated lecture object that is sent over to the server */
                    var updatedLecObj = slideController.lecture;

                    /* Saves the notes */
                    slideController.saveNotes(updatedLecObj);

                    /* Updates the note area with users text and emptys the input textfield for new notes */
                    if (noteArea.text() == "")
                         noteArea.append(usrNote.val());
                    else
                         noteArea.append("<br/>" + usrNote.val());

                    usrNote.val('');
               }
          });
     }
};