function optionalString(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === undefined) {
    return undefined;
  }
  if (typeof encoded !== 'string') {
    throw new Error(`Expected a string for ${property}`);
  }
  return encoded;
}