function fromSNorm(value, rangeMaximum = 255) {
    return clamp(value, 0, rangeMaximum) / rangeMaximum * 2 - 1;
  }