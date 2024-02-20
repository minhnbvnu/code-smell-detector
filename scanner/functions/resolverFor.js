function resolverFor(code, map) {
  return {
    wrapModule: () => Promise.resolve({code, map}),
  };
}