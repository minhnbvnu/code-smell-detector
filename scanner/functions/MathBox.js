function MathBox() {
    MathBox.__super__.constructor.apply(this, arguments);
    this.rotationAutoUpdate = false;
    this.frustumCulled = false;
    this.matrixAutoUpdate = false;
  }