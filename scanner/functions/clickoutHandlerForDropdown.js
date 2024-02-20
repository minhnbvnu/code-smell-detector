function clickoutHandlerForDropdown(event) {
        mousedownOn = null;
        scope.hideResults(event);
        document.body.removeEventListener('click', clickoutHandlerForDropdown);
      }