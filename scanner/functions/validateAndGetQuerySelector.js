function validateAndGetQuerySelector (selector) {
  try {
    var el = document.querySelector(selector);
    if (!el) {
      warn('No element was found matching the selector: "%s"', selector);
    }
    return el;
  } catch (e) {  // Capture exception if it's not a valid selector.
    warn('"%s" is not a valid selector', selector);
    return undefined;
  }
}