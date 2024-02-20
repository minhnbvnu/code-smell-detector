function* makeStringIterator(string, options) {
    const chunkSize = options?.chunkSize || DEFAULT_CHUNK_SIZE;
    let offset = 0;
    const textEncoder = new TextEncoder();
    while (offset < string.length) {
      const chunkLength = Math.min(string.length - offset, chunkSize);
      const chunk = string.slice(offset, offset + chunkLength);
      offset += chunkLength;
      yield textEncoder.encode(chunk);
    }
  }