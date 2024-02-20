function isDescriptor(value) {
  // Ember >= 1.11
  return value && typeof value === 'object' && value.isDescriptor;
}