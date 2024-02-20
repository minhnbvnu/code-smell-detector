function setValueM2a(gl, v) {

  var cache = this.cache;
  var data = flatten(v, this.size, 4);

  if (arraysEqual(cache, data)) return;

  gl.uniformMatrix2fv(this.addr, false, data);

  this.updateCache(data);

}