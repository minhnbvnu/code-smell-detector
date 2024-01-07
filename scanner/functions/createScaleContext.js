function createScaleContext(parent, scale) {
  return createContext(parent, {
    scale,
    type: 'scale'
  });
}