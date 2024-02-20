async function* makeTextDecoderIterator(arrayBufferIterator, options = {}) {
    const textDecoder = new TextDecoder(void 0, options);
    for await (const arrayBuffer of arrayBufferIterator) {
      yield typeof arrayBuffer === "string" ? arrayBuffer : textDecoder.decode(arrayBuffer, { stream: true });
    }
  }