function moduleToBuffer(id, code, encoding) {
  return {
    id,
    linesCount: code.split('\n').length,
    buffer: Buffer.concat([
      Buffer(code, encoding),
      nullByteBuffer // create \0-terminated strings
    ])
  };
}