function cloneTilingPattern(patternKey, boundingBox, xStep, yStep, matrix) {
    var clone = new TilingPattern(
      boundingBox || this.boundingBox,
      xStep || this.xStep,
      yStep || this.yStep,
      this.gState,
      matrix || this.matrix
    );
    clone.stream = this.stream;
    var key = patternKey + "$$" + this.cloneIndex++ + "$$";
    addPattern(key, clone);
    return clone;
  }