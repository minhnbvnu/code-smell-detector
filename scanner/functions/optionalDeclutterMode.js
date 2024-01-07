function optionalDeclutterMode(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === undefined) {
    return undefined;
  }
  if (typeof encoded !== 'string') {
    throw new Error(`Expected a string for ${property}`);
  }
  if (encoded !== 'declutter' && encoded !== 'obstacle' && encoded !== 'none') {
    throw new Error(`Expected declutter, obstacle, or none for ${property}`);
  }
  return encoded;
}