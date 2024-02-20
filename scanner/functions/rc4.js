function rc4(key, data) {
  var lastKey, lastState;
  if (key !== lastKey) {
    var k = repeat(key, ((256 / key.length) >> 0) + 1);
    var state = [];
    for (var i = 0; i < 256; i++) {
      state[i] = i;
    }
    var j = 0;
    for (var i = 0; i < 256; i++) {
      var t = state[i];
      j = (j + t + k.charCodeAt(i)) % 256;
      state[i] = state[j];
      state[j] = t;
    }
    lastKey = key;
    lastState = state;
  } else {
    state = lastState;
  }
  var length = data.length;
  var a = 0;
  var b = 0;
  var out = "";
  for (var i = 0; i < length; i++) {
    a = (a + 1) % 256;
    t = state[a];
    b = (b + t) % 256;
    state[a] = state[b];
    state[b] = t;
    k = state[(state[a] + state[b]) % 256];
    out += String.fromCharCode(data.charCodeAt(i) ^ k);
  }
  return out;
}