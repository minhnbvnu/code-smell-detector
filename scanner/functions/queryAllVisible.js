function queryAllVisible(parent, field, form) {
    var result = [];
    for (var i = 0; i < field.selectors.length; i++) {
      var elems = parent.querySelectorAll(field.selectors[i]);
      for (var j = 0; j < elems.length; j++) {
        var elem = elems[j];
        // Select only elements from specified form
        if (form && form != elem.form) {
          continue;
        }
        // Ignore disabled fields
        if (elem.disabled) {
          continue;
        }
        // Elem or its parent has a style 'display: none',
        // or it is just too narrow to be a real field (a trap for spammers?).
        if (elem.offsetWidth < 30 || elem.offsetHeight < 10) {
          continue;
        }
        // We may have a whitelist of acceptable field types. If so, skip elements of a different type.
        if (field.types && field.types.indexOf(elem.type.toLowerCase()) < 0) {
          continue;
        }
        // Elem takes space on the screen, but it or its parent is hidden with a visibility style.
        var style = window.getComputedStyle(elem);
        if (style.visibility == "hidden") {
          continue;
        }
        // Elem is outside of the boundaries of the visible viewport.
        var rect = elem.getBoundingClientRect();
        if (
          rect.x + rect.width < 0 ||
          rect.y + rect.height < 0 ||
          (rect.x > window.innerWidth || rect.y > window.innerHeight)
        ) {
          continue;
        }
        // This element is visible, will use it.
        result.push(elem);
      }
    }
    return result;
  }