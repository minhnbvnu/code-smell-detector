function getOpacity_IE(element) {
    if (STANDARD_CSS_OPACITY_SUPPORTED)
      return getOpacity(element);

    var filter = Element.getStyle(element, 'filter');
    if (filter.length === 0) return 1.0;
    var match = (filter || '').match(/alpha\(opacity=(.*)\)/);
    if (match[1]) return parseFloat(match[1]) / 100;
    return 1.0;
  }