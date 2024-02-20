function SceneLayer(scene1) {
    this.scene = scene1;
    this.render = bind(this.render, this);
  }