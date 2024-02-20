function getVariableData(valuesObject) {
  // Primitives have the type as the first key
  for (const key in valuesObject) {
    if (key in SCALAR_TYPE) {
      return {type: SCALAR_TYPE[key], values: valuesObject[key]};
    }
  }

  // TODO(twojtasz): a more informative error path that doesn't abort processing
  return null;
}