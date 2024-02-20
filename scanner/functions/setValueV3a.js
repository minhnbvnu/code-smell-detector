function setValueV3a(gl, v) {

  var cache = this.cache;
  var data = flatten(v, this.size, 3);

  if (arraysEqual(cache, data)) return;

  gl.uniform3fv(this.addr, data);

  this.updateCache(data);

}