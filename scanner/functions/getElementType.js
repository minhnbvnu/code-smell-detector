function getElementType(internalInstance) {
  // != used deliberately here to catch undefined and null
  if (internalInstance._currentElement != null) {
    const elementType = internalInstance._currentElement.type;

    if (typeof elementType === 'function') {
      const publicInstance = internalInstance.getPublicInstance();

      if (publicInstance !== null) {
        return types["e" /* ElementTypeClass */];
      } else {
        return types["h" /* ElementTypeFunction */];
      }
    } else if (typeof elementType === 'string') {
      return types["i" /* ElementTypeHostComponent */];
    }
  }

  return types["k" /* ElementTypeOtherOrUnknown */];
}