function createProjection(projection, defaultCode) {
  if (!projection) {
    return get(defaultCode);
  }
  if (typeof projection === 'string') {
    return get(projection);
  }
  return /** @type {Projection} */ (projection);
}