function getGLTFAccessors(attributes) {
  const accessors = {};
  for (const name in attributes) {
    const attribute = attributes[name];
    if (name !== 'indices') {
      const glTFAccessor = getGLTFAccessor(attribute);
      accessors[name] = glTFAccessor;
    }
  }
  return accessors;
}