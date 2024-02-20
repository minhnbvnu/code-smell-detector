function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
  }