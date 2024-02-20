function Strip(renderer, shaders, options) {
    var color, combine, f, factory, hasStyle, linear, map, mask, material, object, position, stpq, uniforms, v;
    Strip.__super__.constructor.call(this, renderer, shaders, options);
    uniforms = options.uniforms, material = options.material, position = options.position, color = options.color, mask = options.mask, map = options.map, combine = options.combine, linear = options.linear, stpq = options.stpq;
    if (uniforms == null) {
      uniforms = {};
    }
    if (material == null) {
      material = true;
    }
    hasStyle = uniforms.styleColor != null;
    this.geometry = new StripGeometry({
      items: options.items,
      width: options.width,
      height: options.height,
      depth: options.depth
    });
    this._adopt(uniforms);
    this._adopt(this.geometry.uniforms);
    factory = shaders.material();
    v = factory.vertex;
    v.pipe(this._vertexColor(color, mask));
    v.require(this._vertexPosition(position, material, map, 2, stpq));
    if (!material) {
      v.pipe('mesh.position', this.uniforms);
    }
    if (material) {
      v.pipe('strip.position.normal', this.uniforms);
    }
    v.pipe('project.position', this.uniforms);
    factory.fragment = f = this._fragmentColor(hasStyle, material, color, mask, map, 2, stpq, combine, linear);
    f.pipe('fragment.color', this.uniforms);
    this.material = this._material(factory.link({
      side: THREE.DoubleSide
    }));
    object = new THREE.Mesh(this.geometry, this.material);
    this._raw(object);
    this.renders = [object];
  }