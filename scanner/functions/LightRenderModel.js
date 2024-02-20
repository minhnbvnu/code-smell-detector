function LightRenderModel(light1, transform) {
    var origin;
    this.light = light1;
    this.colorIntensity = this.light.color.copy().scale(this.light.intensity);
    this.type = this.light.type;
    this.intensity = this.light.intensity;
    this.point = this.light.point.copy().transform(transform);
    origin = seen.Points.ZERO().transform(transform);
    this.normal = this.light.normal.copy().transform(transform).subtract(origin).normalize();
  }