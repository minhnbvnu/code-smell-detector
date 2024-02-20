function CanvasRenderContext(el1) {
    this.el = el1;
    CanvasRenderContext.__super__.constructor.call(this);
    this.el = seen.Util.element(this.el);
    this.ctx = this.el.getContext('2d');
  }