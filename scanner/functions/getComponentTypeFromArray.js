function getComponentTypeFromArray(typedArray) {
  const componentType = ARRAY_TO_COMPONENT_TYPE.get(typedArray.constructor);
  if (!componentType) {
    throw new Error('Illegal typed array');
  }
  return componentType;
}