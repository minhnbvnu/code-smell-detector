function makeKeyupHandler(elem) {
    return function () {
      hidePlaceholder(elem, keydownVal);

      // If the element is now empty we need to show the placeholder
      if ( elem.value === '' ) {
        elem.blur();
        moveCaret(elem, 0);
      }
    };
  }