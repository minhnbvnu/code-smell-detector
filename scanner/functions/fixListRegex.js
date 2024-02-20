function fixListRegex(s) {
    // make dots optional and also make them literal
    return s.replace(/\./, "\\.?");
  }