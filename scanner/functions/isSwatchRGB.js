function isSwatchRGB(value) {
  const test = {
    r: 0,
    g: 0,
    b: 0,
    toColorString: () => "",
    contrast: () => 0,
    relativeLuminance: 0
  };

  for (const key in test) {
    if (typeof test[key] !== typeof value[key]) {
      return false;
    }
  }

  return true;
}