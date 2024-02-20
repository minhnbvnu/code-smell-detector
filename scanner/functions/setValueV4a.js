function setValueV4a(gl, v) {

  var cache = this.cache;
  var data = flatten(v, this.size, 4);

  if (arraysEqual(cache, data)) return;

  gl.uniform4fv(this.addr, data);

  this.updateCache(data);

}