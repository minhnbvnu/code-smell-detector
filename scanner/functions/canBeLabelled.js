function canBeLabelled(el) {
    return labellable[el.localName] || false;
  }