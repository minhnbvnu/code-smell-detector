function setValueV2a(gl, v) {

  var cache = this.cache;
  var data = flatten(v, this.size, 2);

  if (arraysEqual(cache, data)) return;

  gl.uniform2fv(this.addr, data);

  this.updateCache(data);

}