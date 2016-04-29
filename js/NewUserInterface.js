$(document).ready(function() {
   var canvas = $("#slideFrame");
   console.log(canvas);

   //auto expand textarea
   function adjust_textarea(h) {
      h.style.height = "20px";
      h.style.height = (h.scrollHeight) + "px";
   }
});