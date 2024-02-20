function unpack(data) {
    const result = new Uint8Array(data.length);
    for (let i2 = 0; i2 < data.length; ++i2) {
      const ch = data.charCodeAt(i2);
      result[i2] = ch > 96 ? ch - 71 : ch > 64 ? ch - 65 : ch > 47 ? ch + 4 : ch > 46 ? 63 : 62;
    }
    let write = 0;
    for (let i2 = 0; i2 < data.length; ++i2) {
      result[write++] = result[i2] < 60 ? wasmpack[result[i2]] : (result[i2] - 60) * 64 + result[++i2];
    }
    return result.buffer.slice(0, write);
  }