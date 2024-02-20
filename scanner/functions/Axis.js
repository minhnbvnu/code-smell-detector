function Axis(node, context, helpers) {
    Axis.__super__.constructor.call(this, node, context, helpers);
    this.axisPosition = this.axisStep = this.resolution = this.line = this.arrows = null;
  }