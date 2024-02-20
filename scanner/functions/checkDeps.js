function checkDeps() {
  // if containerId is a string, it must be the ID of a DOM node
  if (typeof containerElOrId === 'string') {
    // cannot be empty
    if (containerElOrId === '') {
      window.alert('ChessBoard Error 1001: ' +
        'The first argument to ChessBoard() cannot be an empty string.' +
        '\n\nExiting...');
      return false;
    }

    // make sure the container element exists in the DOM
    var el = document.getElementById(containerElOrId);
    if (! el) {
      window.alert('ChessBoard Error 1002: Element with id "' +
        containerElOrId + '" does not exist in the DOM.' +
        '\n\nExiting...');
      return false;
    }

    // set the containerEl
    containerEl = $(el);
  }

  // else it must be something that becomes a jQuery collection
  // with size 1
  // ie: a single DOM node or jQuery object
  else {
    containerEl = $(containerElOrId);

    if (containerEl.length !== 1) {
      window.alert('ChessBoard Error 1003: The first argument to ' +
        'ChessBoard() must be an ID or a single DOM node.' +
        '\n\nExiting...');
      return false;
    }
  }

  // JSON must exist
  if (! window.JSON ||
      typeof JSON.stringify !== 'function' ||
      typeof JSON.parse !== 'function') {
    window.alert('ChessBoard Error 1004: JSON does not exist. ' +
      'Please include a JSON polyfill.\n\nExiting...');
    return false;
  }

  // check for a compatible version of jQuery
  if (! (typeof window.$ && $.fn && $.fn.jquery &&
      compareSemVer($.fn.jquery, MINIMUM_JQUERY_VERSION) === true)) {
    window.alert('ChessBoard Error 1005: Unable to find a valid version ' +
      'of jQuery. Please include jQuery ' + MINIMUM_JQUERY_VERSION + ' or ' +
      'higher on the page.\n\nExiting...');
    return false;
  }

  return true;
}