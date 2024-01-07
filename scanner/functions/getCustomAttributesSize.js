function getCustomAttributesSize(customAttributes) {
  return Object.keys(customAttributes).reduce(
    (prev, curr) => prev + (customAttributes[curr].size || 1),
    0,
  );
}