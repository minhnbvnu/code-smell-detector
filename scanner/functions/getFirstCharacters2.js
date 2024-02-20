function getFirstCharacters2(data, length4 = 5) {
    if (typeof data === "string") {
      return data.slice(0, length4);
    } else if (ArrayBuffer.isView(data)) {
      return getMagicString2(data.buffer, data.byteOffset, length4);
    } else if (data instanceof ArrayBuffer) {
      const byteOffset = 0;
      return getMagicString2(data, byteOffset, length4);
    }
    return "";
  }