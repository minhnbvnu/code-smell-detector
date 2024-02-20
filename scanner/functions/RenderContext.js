function RenderContext() {
    this.render = bind(this.render, this);
    this.layers = [];
  }