function ScreenGeometry(options) {
    var ref, ref1;
    if (this.uniforms == null) {
      this.uniforms = {};
    }
    this.uniforms.geometryScale = {
      type: 'v4',
      value: new THREE.Vector4
    };
    options.width = Math.max(2, (ref = +options.width) != null ? ref : 2);
    options.height = Math.max(2, (ref1 = +options.height) != null ? ref1 : 2);
    this.cover();
    ScreenGeometry.__super__.constructor.call(this, options);
  }