function getArrayBufferOrStringFromDataSync(data, loader, options) {
    if (loader.text && typeof data === "string") {
      return data;
    }
    if (isBuffer2(data)) {
      data = data.buffer;
    }
    if (data instanceof ArrayBuffer) {
      const arrayBuffer = data;
      if (loader.text && !loader.binary) {
        const textDecoder = new TextDecoder("utf8");
        return textDecoder.decode(arrayBuffer);
      }
      return arrayBuffer;
    }
    if (ArrayBuffer.isView(data)) {
      if (loader.text && !loader.binary) {
        const textDecoder = new TextDecoder("utf8");
        return textDecoder.decode(data);
      }
      let arrayBuffer = data.buffer;
      const byteLength = data.byteLength || data.length;
      if (data.byteOffset !== 0 || byteLength !== arrayBuffer.byteLength) {
        arrayBuffer = arrayBuffer.slice(data.byteOffset, data.byteOffset + byteLength);
      }
      return arrayBuffer;
    }
    throw new Error(ERR_DATA);
  }