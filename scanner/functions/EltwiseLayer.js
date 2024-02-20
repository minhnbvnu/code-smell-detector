function EltwiseLayer() {
    this.checkParameters = bind(this.checkParameters, this);
    this.inferShapes = bind(this.inferShapes, this);
  }