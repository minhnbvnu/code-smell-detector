function optionalNumber(flatStyle, property) {
  const value = flatStyle[property];
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== 'number') {
    throw new Error(`Expected a number for ${property}`);
  }
  return value;
}