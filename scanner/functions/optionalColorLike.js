function optionalColorLike(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === undefined) {
    return undefined;
  }
  return requireColorLike(encoded, property);
}