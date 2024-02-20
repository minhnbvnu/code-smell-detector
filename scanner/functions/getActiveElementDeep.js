function getActiveElementDeep() {
  let win = window;
  let element = getActiveElement();
  while (element instanceof win.HTMLIFrameElement) {
    // Accessing the contentDocument of a HTMLIframeElement can cause the browser
    // to throw, e.g. if it has a cross-origin src attribute
    try {
      win = element.contentDocument.defaultView;
    } catch (e) {
      return element;
    }
    element = getActiveElement(win.document);
  }
  return element;
}