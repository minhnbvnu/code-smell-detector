function setValue4iv(gl, v) {

  var cache = this.cache;

  if (arraysEqual(cache, v)) return;

  gl.uniform4iv(this.addr, v);

  copyArray(cache, v);

}