function Light(type1, options) {
    this.type = type1;
    Light.__super__.constructor.apply(this, arguments);
    seen.Util.defaults(this, options, this.defaults);
    this.id = seen.Util.uniqueId('l');
  }