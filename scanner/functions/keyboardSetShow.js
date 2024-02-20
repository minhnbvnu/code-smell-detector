function keyboardSetShow(e) {
  clearTimeout(keyboardFocusInTimer);
  clearTimeout(keyboardFocusOutTimer);

  keyboardFocusInTimer = setTimeout(function(){
    if ( keyboardLastShow + 350 > Date.now() ) return;
    void 0;
    keyboardLastShow = Date.now();
    var keyboardHeight;
    var elementBounds = keyboardActiveElement.getBoundingClientRect();
    var count = 0;

    keyboardPollHeightTimer = setInterval(function(){

      keyboardHeight = keyboardGetHeight();
      if (count > 10){
        clearInterval(keyboardPollHeightTimer);
        //waited long enough, just guess
        keyboardHeight = 275;
      }
      if (keyboardHeight){
        clearInterval(keyboardPollHeightTimer);
        keyboardShow(e.target, elementBounds.top, elementBounds.bottom, keyboardViewportHeight, keyboardHeight);
      }
      count++;

    }, 100);
  }, 32);
}