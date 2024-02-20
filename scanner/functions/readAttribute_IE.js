function readAttribute_IE(element, name) {
    element = $(element);

    var table = ATTRIBUTE_TRANSLATIONS.read;
    if (table.values[name])
      return table.values[name](element, name);

    if (table.names[name]) name = table.names[name];

    if (name.include(':')) {
      if (!element.attributes || !element.attributes[name]) return null;
      return element.attributes[name].value;
    }

    return element.getAttribute(name);
  }