function writeData(dest, offset, data) {
    var i, ii;

    if (data instanceof Uint8Array) {
      dest.set(data, offset);
    } else if (typeof data === "string") {
      for (i = 0, ii = data.length; i < ii; i++) {
        dest[offset++] = data.charCodeAt(i) & 0xff;
      }
    } else {
      for (i = 0, ii = data.length; i < ii; i++) {
        dest[offset++] = data[i] & 0xff;
      }
    }
  }