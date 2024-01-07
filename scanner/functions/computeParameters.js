function computeParameters(vertexIndex, angleSum) {
    if (angleSum === 0) {
      return vertexIndex * 10000;
    }
    return Math.sign(angleSum) * (vertexIndex * 10000 + Math.abs(angleSum));
  }