function purgeCollection(elements) {
    var i = elements.length;
    while (i--)
      purgeElement(elements[i]);
  }