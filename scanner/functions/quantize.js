function quantize(i) {
    if(i === Infinity) { return Infinity; }
    return quantizedNumber(quantizedIndex(i));
  }