function setValue2iv(gl, v) {

  var cache = this.cache;

  if (arraysEqual(cache, v)) return;

  gl.uniform2iv(this.addr, v);

  copyArray(cache, v);

}