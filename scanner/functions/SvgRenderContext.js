function SvgRenderContext(svg) {
    this.svg = svg;
    SvgRenderContext.__super__.constructor.call(this);
    this.svg = seen.Util.element(this.svg);
  }