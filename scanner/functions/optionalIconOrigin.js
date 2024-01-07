function optionalIconOrigin(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === undefined) {
    return undefined;
  }
  if (
    encoded !== 'bottom-left' &&
    encoded !== 'bottom-right' &&
    encoded !== 'top-left' &&
    encoded !== 'top-right'
  ) {
    throw new Error(
      `Expected bottom-left, bottom-right, top-left, or top-right for ${property}`,
    );
  }
  return encoded;
}