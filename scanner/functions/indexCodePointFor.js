function indexCodePointFor(pointer, index) {
    if (!index) return null;
    return index[pointer] || null;
  }