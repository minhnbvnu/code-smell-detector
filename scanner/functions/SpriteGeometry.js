function SpriteGeometry(options) {
    var base, depth, height, i, index, items, j, k, l, len, m, n, o, p, points, position, quad, ref, ref1, ref2, ref3, ref4, samples, sprite, triangles, v, width, x, y, z;
    SpriteGeometry.__super__.constructor.call(this, options);
    this._clipUniforms();
    this.items = items = +options.items || 2;
    this.width = width = +options.width || 1;
    this.height = height = +options.height || 1;
    this.depth = depth = +options.depth || 1;
    samples = items * width * height * depth;
    points = samples * 4;
    triangles = samples * 2;
    this.addAttribute('index', new THREE.BufferAttribute(new Uint16Array(triangles * 3), 1));
    this.addAttribute('position4', new THREE.BufferAttribute(new Float32Array(points * 4), 4));
    this.addAttribute('sprite', new THREE.BufferAttribute(new Float32Array(points * 2), 2));
    this._autochunk();
    index = this._emitter('index');
    position = this._emitter('position4');
    sprite = this._emitter('sprite');
    quad = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    base = 0;
    for (i = j = 0, ref = samples; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      index(base);
      index(base + 1);
      index(base + 2);
      index(base + 1);
      index(base + 2);
      index(base + 3);
      base += 4;
    }
    for (z = k = 0, ref1 = depth; 0 <= ref1 ? k < ref1 : k > ref1; z = 0 <= ref1 ? ++k : --k) {
      for (y = m = 0, ref2 = height; 0 <= ref2 ? m < ref2 : m > ref2; y = 0 <= ref2 ? ++m : --m) {
        for (x = n = 0, ref3 = width; 0 <= ref3 ? n < ref3 : n > ref3; x = 0 <= ref3 ? ++n : --n) {
          for (l = o = 0, ref4 = items; 0 <= ref4 ? o < ref4 : o > ref4; l = 0 <= ref4 ? ++o : --o) {
            for (p = 0, len = quad.length; p < len; p++) {
              v = quad[p];
              position(x, y, z, l);
              sprite(v[0], v[1]);
            }
          }
        }
      }
    }
    this._finalize();
    this.clip();
    return;
  }