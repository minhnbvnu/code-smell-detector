function __getStylesheet() {
    if (!_stylesheet) {
      _stylesheet = document.createElement('style');
      document.head.appendChild(_stylesheet);
    }
    return _stylesheet;
  }