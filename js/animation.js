/* global $, slideController, MutationObserver */
$(document).ready(function() {
     
     /* Target element that the mutation observer is using */
     var target = document.querySelector("#slide-page");

     /* Mutation observer to detect changes in the DOM */
     var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
               var elmAdded = $(mutation.addedNodes[0]);
               if (elmAdded.attr("class") == "header") {
                    animate(elmAdded);
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

     var animate = function(elt) {
          elt.textillate({
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

});