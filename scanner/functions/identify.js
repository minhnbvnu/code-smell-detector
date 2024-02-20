function identify(element) {
    element = $(element);
    var id = Element.readAttribute(element, 'id');
    if (id) return id;

    do { id = 'anonymous_element_' + idCounter++ } while ($(id));

    Element.writeAttribute(element, 'id', id);
    return id;
  }