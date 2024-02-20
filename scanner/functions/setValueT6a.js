function setValueT6a(gl, v, renderer) {

  var cache = this.cache;
  var n = v.length;

  var units = allocTexUnits(renderer, n);

  if (arraysEqual(cache, units) === false) {

    gl.uniform1iv(this.addr, units);
    copyArray(cache, units);

  }

  for (var i = 0; i !== n; ++i) {

    renderer.setTextureCube(v[i] || emptyCubeTexture, units[i]);

  }

}