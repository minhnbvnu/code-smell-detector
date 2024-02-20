function setValue3iv(gl, v) {

  var cache = this.cache;

  if (arraysEqual(cache, v)) return;

  gl.uniform3iv(this.addr, v);

  copyArray(cache, v);

}