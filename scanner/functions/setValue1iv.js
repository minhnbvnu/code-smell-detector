function setValue1iv(gl, v) {

  var cache = this.cache;

  if (arraysEqual(cache, v)) return;

  gl.uniform1iv(this.addr, v);

  copyArray(cache, v);

}