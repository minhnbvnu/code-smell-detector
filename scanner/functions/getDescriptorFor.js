function getDescriptorFor(object, key) {
  if (isDescriptor(object[key])) {
    return object[key];
  }

  // exists longeer than ember 3.10
  if (Debug.isComputed) {
    const { descriptorForDecorator, descriptorForProperty } =
      emberSafeRequire('@ember/-internals/metal') || {};
    return (
      descriptorForDecorator?.(object[key]) ||
      descriptorForProperty?.(object, key)
    );
  }

  return object[key];
}