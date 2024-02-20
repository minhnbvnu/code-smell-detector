function hScrollbarTakesSpace(cm) {
    return cm.display.scroller.clientHeight - cm.display.wrapper.clientHeight < scrollerCutOff - 3;
  }