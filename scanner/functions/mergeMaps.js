function mergeMaps(m1, m2) {
    return new Map([...m1 || new Map(), ...m2 || new Map()]);
  }