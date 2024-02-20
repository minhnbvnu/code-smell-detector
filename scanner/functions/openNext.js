function openNext() {
  $("#nextWindowConfirmation").hide();
  try {
    if(windowIsClosed(nextWindow)){
      nextWindow = blankStyledWindow("Next Slide Preview", 'width=320,height=300', 'next');

      // Firefox doesn't load content properly unless we delay it slightly. Yay for race conditions.
//      nextWindow.addEventListener("unload", function() {
      window.setTimeout(function() {
        // call back and update the parent presenter if the window is closed
        nextWindow.onunload = function(e) {
          nextWindow.opener.chooseLayout('default');
        };

        postSlide();
      }, 500);
      $("#settings-modal").dialog("close");
    }
  }
  catch(e) {
    console.log(e);
    console.log('Failed to open or connect next window. Popup blocker?');
  }
}