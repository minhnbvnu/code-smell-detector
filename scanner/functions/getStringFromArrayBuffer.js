function getStringFromArrayBuffer(arrayBuffer, byteOffset, byteLength) {
    assert2(arrayBuffer instanceof ArrayBuffer);
    const textDecoder = new TextDecoder("utf8");
    const typedArray = new Uint8Array(arrayBuffer, byteOffset, byteLength);
    const string = textDecoder.decode(typedArray);
    return string;
  }