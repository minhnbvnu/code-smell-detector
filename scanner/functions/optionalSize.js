function optionalSize(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === undefined) {
    return undefined;
  }
  if (typeof encoded === 'number') {
    return toSize(encoded);
  }
  if (!Array.isArray(encoded)) {
    throw new Error(`Expected a number or size array for ${property}`);
  }
  if (
    encoded.length !== 2 ||
    typeof encoded[0] !== 'number' ||
    typeof encoded[1] !== 'number'
  ) {
    throw new Error(`Expected a number or size array for ${property}`);
  }
  return encoded;
}