function undoClipping(element) {
    element = $(element);
    var storage = Element.getStorage(element),
     overflow = storage.get('prototype_made_clipping');

    if (!Object.isUndefined(overflow)) {
      storage.unset('prototype_made_clipping');
      element.style.overflow = overflow || '';
    }

    return element;
  }