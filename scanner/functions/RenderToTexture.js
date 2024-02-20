function RenderToTexture(renderer, shaders, options) {
    var ref;
    this.scene = (ref = options.scene) != null ? ref : new THREE.Scene();
    this.camera = options.camera;
    RenderToTexture.__super__.constructor.call(this, renderer, shaders);
    this.build(options);
  }