async function* makeNodeStreamIterator(stream, options) {
    for await (const chunk of stream) {
      yield toArrayBuffer(chunk);
    }
  }