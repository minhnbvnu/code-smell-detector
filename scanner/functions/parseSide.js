function parseSide (side) {
  switch (side) {
    case 'back': {
      return THREE.FrontSide;
    }
    case 'double': {
      return THREE.DoubleSide;
    }
    default: {
      return THREE.BackSide;
    }
  }
}