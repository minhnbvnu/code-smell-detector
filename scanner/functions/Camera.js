function Camera(options) {
    seen.Util.defaults(this, options, this.defaults);
    Camera.__super__.constructor.apply(this, arguments);
  }