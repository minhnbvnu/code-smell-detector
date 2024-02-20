function writeAttribute(element, name, value) {
    element = $(element);
    var attributes = {}, table = ATTRIBUTE_TRANSLATIONS.write;

    if (typeof name === 'object') {
      attributes = name;
    } else {
      attributes[name] = Object.isUndefined(value) ? true : value;
    }

    for (var attr in attributes) {
      name = table.names[attr] || attr;
      value = attributes[attr];
      if (table.values[attr])
        name = table.values[attr](element, value);
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }

    return element;
  }