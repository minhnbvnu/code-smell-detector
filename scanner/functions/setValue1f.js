function setValue1f(gl, v) {

  var cache = this.cache;

  if (cache[0] === v) return;

  gl.uniform1f(this.addr, v);

  cache[0] = v;

}