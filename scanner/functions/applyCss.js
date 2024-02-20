function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }