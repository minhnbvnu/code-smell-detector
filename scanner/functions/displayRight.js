function displayRight(cm, scrollbar) {
    if (scrollbar && cm.display.scroller.offsetWidth > cm.display.scroller.clientWidth)
      return barV(cm).getBoundingClientRect().left;
    else
      return cm.getWrapperElement().getBoundingClientRect().right - 1;
  }