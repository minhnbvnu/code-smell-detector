function displayBottom(cm, scrollbar) {
    if (scrollbar && cm.display.scroller.offsetHeight > cm.display.scroller.clientHeight)
      return barH(cm).getBoundingClientRect().top;
    else
      return cm.getWrapperElement().getBoundingClientRect().bottom - 1;
  }