function createNative(componentConstructor, tag) {
  if (typeof tag !== 'string' && typeof tag !== 'function') {
    throw new Error(`Cannot create glamorous component for ${tag}`);
  }

  return componentConstructor(tag);
}