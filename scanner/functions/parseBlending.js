function parseBlending (blending) {
  switch (blending) {
    case 'none': {
      return THREE.NoBlending;
    }
    case 'additive': {
      return THREE.AdditiveBlending;
    }
    case 'subtractive': {
      return THREE.SubtractiveBlending;
    }
    case 'multiply': {
      return THREE.MultiplyBlending;
    }
    default: {
      return THREE.NormalBlending;
    }
  }
}