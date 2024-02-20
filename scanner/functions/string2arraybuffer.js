function string2arraybuffer(e) {
    var t = new Uint8Array(e.length);
    for (var _r = 0; _r < e.length; _r++) t[_r] = e.charCodeAt(_r);
    return t.buffer;
  }