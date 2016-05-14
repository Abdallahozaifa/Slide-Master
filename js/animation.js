/* global $, MutationObserver */
$(document).ready(function() {

     /* Target element that the mutation observer is using */
     var target = document.querySelector("#slide-page");

     /* Mutation observer to detect changes in the DOM */
     var observer = new MutationObserver(function(mutations) {
          
          /* Iterates through all the changes that occured in the DOM */
          mutations.forEach(function(mutation) {
               /* Elm added in the DOM */
               var elmAdded = $(mutation.addedNodes[0]);
               
               /* Adding animation to elements with a specific class */
               switch(elmAdded.attr("class")){
                    case "header":
                         animateHeader(elmAdded);
                         break;
                    case "description":
                         animateDescr(elmAdded);
                         break;
                    case "slide-image":
                         animateImage(elmAdded);
                         break;
               }

          });
     });

     /* Mutation observer configuration */
     var observerConfig = {
          attributes: true,
          childList: true,
          characterData: true
     };

     /* Started observing the target element */
     observer.observe(target, observerConfig);
     
     /* Animation for header */
     var animateHeader = function(elm) {
          elm.textillate({
               loop: true,
               in : {
                    effect: 'tada',
                    delayScale: 1,
                    delay: 150,
                    shuffle: true
               },
               out: {
                    effect: 'flipOutY',
                    reverse: true
               }
          });
     };
     
     /* Animation for descriptions */
     var animateDescr = function(elm) {
          elm.textillate();
     };
     
     /* Animation for images */
     var animateImage = function(elm){
          elm.addClass('animated bounceInLeft');
     };
     
});