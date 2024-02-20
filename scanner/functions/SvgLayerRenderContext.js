function SvgLayerRenderContext(group1) {
    this.group = group1;
    this._elementFactory = bind(this._elementFactory, this);
    this.pathPainter = new seen.SvgPathPainter(this._elementFactory);
    this.textPainter = new seen.SvgTextPainter(this._elementFactory);
    this.circlePainter = new seen.SvgCirclePainter(this._elementFactory);
    this.rectPainter = new seen.SvgRectPainter(this._elementFactory);
    this._i = 0;
  }