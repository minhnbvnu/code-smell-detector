function RenderAnimator(context) {
    RenderAnimator.__super__.constructor.apply(this, arguments);
    this.onFrame(context.render);
  }