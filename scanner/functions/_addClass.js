function _addClass(element, className, classRegExp) {
    if (element.className) {
      _removeClass(element, classRegExp);
      element.className += " " + className;
    } else {
      element.className = className;
    }
  }