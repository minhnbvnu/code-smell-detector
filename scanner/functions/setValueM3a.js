function setValueM3a(gl, v) {

  var cache = this.cache;
  var data = flatten(v, this.size, 9);

  if (arraysEqual(cache, data)) return;

  gl.uniformMatrix3fv(this.addr, false, data);

  this.updateCache(data);

}