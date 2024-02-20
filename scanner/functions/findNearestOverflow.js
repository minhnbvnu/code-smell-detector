function findNearestOverflow(element) {
      while (element) {
        if (getComputedStyle(element).overflow != 'visible')
          return element;
      // TODO(flackr): This should follow standard containing block rules.
        element = element.parentElement;
      }
      return document.scrollingElement;
    }