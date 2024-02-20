function _guidFor(item) {
    if (Ember.ObjectProxy.detectInstance(item)) {
      return guidFor(get(item, 'content'));
    }
    return guidFor(item);
  }