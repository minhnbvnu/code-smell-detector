function optionalIconAnchorUnits(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === undefined) {
    return undefined;
  }
  if (encoded !== 'pixels' && encoded !== 'fraction') {
    throw new Error(`Expected pixels or fraction for ${property}`);
  }
  return encoded;
}