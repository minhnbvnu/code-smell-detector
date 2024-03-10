function presenterKeyDown(event){
  var key = event.keyCode;

  debug('keyDown: ' + key);
  // avoid overriding browser commands
  if (event.ctrlKey || event.altKey || event.metaKey) {
    return true;
  }

  switch(getAction(event)) {
    case 'DEBUG':     toggleDebug();      break;
    case 'PREV':      presPrevStep();     break; // Watch that this uses presPrevStep and not prevStep
    case 'PREVSEC':   presPrevSec();      break; // Same here
    case 'NEXT':      presNextStep();     break; // Same here
    case 'NEXTSEC':   presNextSec();      break; // Same here
    case 'REFRESH':   reloadSlides();     break;
    case 'RELOAD':    reloadSlides(true); break;
    case 'CONTENTS':  toggleContents();   break;
    case 'HELP':      toggleHelp();       break;
    case 'BLANK':     blankScreen();      break;
    case 'FOOTER':    toggleFooter();     break;
    case 'FOLLOW':    toggleFollow();     break;
    case 'NOTES':     toggleNotes();      break;
    case 'PAUSE':     togglePause();      break;
    case 'PRESHOW':   togglePreShow();    break;
    case 'CLEAR':
      removeResults();
      try {
        slaveWindow.removeResults();
      } catch (e) {}
      break;
    case 'EXECUTE':
      debug('executeCode');
      executeVisibleCodeBlock();
      try {
         slaveWindow.executeVisibleCodeBlock();
      } catch (e) {}
      break;
    default:
      switch (key) {
        case 48: // 0
        case 49: // 1
        case 50: // 2
        case 51: // 3
        case 52: // 4
        case 53: // 5
        case 54: // 6
        case 55: // 7
        case 56: // 8
        case 57: // 9
          // concatenate numbers from previous keypress events
          gotoSlidenum = gotoSlidenum * 10 + (key - 48);
          break;
        case 13: // enter/return
          // check for a combination of numbers from previous keypress events
          if (gotoSlidenum > 0) {
            debug('go to ' + gotoSlidenum);
            slidenum = gotoSlidenum - 1;
            showSlide(true);
            try {
              slaveWindow.slidenum = gotoSlidenum - 1;
              slaveWindow.showSlide(true);
            } catch (e) {}
            gotoSlidenum = 0;
          }
          break;
        default:
          break;
      }
      break;
    }
  return true;
}