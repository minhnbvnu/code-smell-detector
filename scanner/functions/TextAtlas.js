function TextAtlas(renderer, shaders, options) {
    var ref, ref1, ref2, ref3, ref4, ref5, ua;
    this.font = (ref = options.font) != null ? ref : ['sans-serif'];
    this.size = options.size || 24;
    this.style = (ref1 = options.style) != null ? ref1 : 'normal';
    this.variant = (ref2 = options.variant) != null ? ref2 : 'normal';
    this.weight = (ref3 = options.weight) != null ? ref3 : 'normal';
    this.outline = (ref4 = +((ref5 = options.outline) != null ? ref5 : 5)) != null ? ref4 : 0;
    options.width || (options.width = 256);
    options.height || (options.height = 256);
    options.type = THREE.UnsignedByteType;
    options.channels = 1;
    options.backed = true;
    this.gamma = 1;
    if (typeof navigator !== 'undefined') {
      ua = navigator.userAgent;
      if (ua.match(/Chrome/) && ua.match(/OS X/)) {
        this.gamma = .5;
      }
    }
    this.scratchW = this.scratchH = 0;
    TextAtlas.__super__.constructor.call(this, renderer, shaders, options);
  }