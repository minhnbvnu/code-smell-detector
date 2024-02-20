function setValue1i(gl, v) {

  var cache = this.cache;

  if (cache[0] === v) return;

  gl.uniform1i(this.addr, v);

  cache[0] = v;

}