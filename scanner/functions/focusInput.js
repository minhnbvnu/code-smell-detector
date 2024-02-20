function focusInput(element) {
    var focusOn = element[0].querySelector('[autofocus]');
    if (focusOn) {
      focusOn.focus();
    }
  }