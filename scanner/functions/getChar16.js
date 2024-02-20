function getChar16(index) {
    return String.fromCharCode(buffer.readUInt16BE(index));
  }