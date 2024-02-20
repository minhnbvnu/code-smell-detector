function setValue1fv(gl, v) {

  var cache = this.cache;

  if (arraysEqual(cache, v)) return;

  gl.uniform1fv(this.addr, v);

  copyArray(cache, v);

}