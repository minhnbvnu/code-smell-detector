function keepWithin(value, min, max) {
    if(value < min) value = min;
    if(value > max) value = max;
    return value;
  }