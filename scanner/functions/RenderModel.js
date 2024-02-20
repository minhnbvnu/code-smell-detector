function RenderModel(surface1, transform1, projection1, viewport1) {
    this.surface = surface1;
    this.transform = transform1;
    this.projection = projection1;
    this.viewport = viewport1;
    this.points = this.surface.points;
    this.transformed = this._initRenderData();
    this.projected = this._initRenderData();
    this._update();
  }