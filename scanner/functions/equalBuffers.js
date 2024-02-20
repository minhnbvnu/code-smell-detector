function equalBuffers(a, b) {
    if (a.byteLength !== b.byteLength) {
      return false;
    }

    var aBytes = new Uint8Array(a);
    var bBytes = new Uint8Array(b);

    for (var i = 0; i < a.byteLength; i++) {
      if (aBytes[i] !== bBytes[i]) {
        return false;
      }
    }

    return true;
  }