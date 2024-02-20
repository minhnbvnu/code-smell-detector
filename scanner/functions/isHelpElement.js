function isHelpElement(element) {
    return element === help || element.parentNode && isHelpElement(element.parentNode);
  }