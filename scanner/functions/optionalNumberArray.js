function optionalNumberArray(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === undefined) {
    return undefined;
  }
  return requireNumberArray(encoded, property);
}