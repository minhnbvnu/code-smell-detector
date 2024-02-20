function follow(slide, newIncrement, force) {
  presenterSlideNum = slide;

  if ((mode.follow && ! activityIncomplete) || force) {
    var lastSlide = slidenum;
    console.log("New slide: " + slide);
    gotoSlide(slide);

    if( ! $("body").hasClass("presenter") ) {
      switch (slidenum - lastSlide) {
        case -1:
          fireEvent("showoff:prev");
          break;

        case 1:
          fireEvent("showoff:next");
          break;
      }

      // if the master says we're incrementing. Use a loop in case the viewer is out of sync
      while(newIncrement > incrCurr) {
        increment();
      }

    }
  }

  // show the sync button if we're not on the same slide as the presenter
  checkSyncState();
}