function CanvasLayerRenderContext(ctx) {
    this.ctx = ctx;
    this.pathPainter = new seen.CanvasPathPainter(this.ctx);
    this.ciclePainter = new seen.CanvasCirclePainter(this.ctx);
    this.textPainter = new seen.CanvasTextPainter(this.ctx);
    this.rectPainter = new seen.CanvasRectPainter(this.ctx);
  }