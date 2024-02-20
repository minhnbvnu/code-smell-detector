function wrapRenderPlaceFunction(func) {
  if (typeof func === 'string') {
    return () => func;
  }
  return func;
}