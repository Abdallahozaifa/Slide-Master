/* global $, MutationObserver */
$(document).ready(function() {

     /* Target element that the mutation observer is using */
     var target = document.querySelector("#slide-page");

     /* Mutation observer to detect changes in the DOM */
     var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
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

     var animateDescr = function(elm) {
          elm.textillate();
     };
     
     var animateImage = function(elm){
          elm.addClass('animated bounceInLeft');
     };
     
});