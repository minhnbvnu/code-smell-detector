function setValueM4a(gl, v) {

  var cache = this.cache;
  var data = flatten(v, this.size, 16);

  if (arraysEqual(cache, data)) return;

  gl.uniformMatrix4fv(this.addr, false, data);

  this.updateCache(data);

}