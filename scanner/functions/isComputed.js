function isComputed(object, key) {
  // Ember > 3.10
  if (Debug.isComputed && Debug.isComputed(object, key)) {
    return true;
  }

  if (emberMeta(object) && emberMeta(object).peekDescriptors(key)) {
    return !!emberMeta(object).peekDescriptors(key)._getter;
  }

  if (getDescriptorFor(object, key) instanceof ComputedProperty) {
    return true;
  }

  // Ember < 3.10
  return object[key] instanceof ComputedProperty;
}