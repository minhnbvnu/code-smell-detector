function getStyle_Opera(element, style) {
    switch (style) {
      case 'height': case 'width':
        if (!Element.visible(element)) return null;

        var dim = parseInt(getStyle(element, style), 10);

        if (dim !== element['offset' + style.capitalize()])
          return dim + 'px';

        return Element.measure(element, style);

      default: return getStyle(element, style);
    }
  }