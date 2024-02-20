async function* makeBrowserStreamIterator(stream, options) {
    const reader = stream.getReader();
    let nextBatchPromise;
    try {
      while (true) {
        const currentBatchPromise = nextBatchPromise || reader.read();
        if (options?._streamReadAhead) {
          nextBatchPromise = reader.read();
        }
        const { done, value } = await currentBatchPromise;
        if (done) {
          return;
        }
        yield toArrayBuffer(value);
      }
    } catch (error) {
      reader.releaseLock();
    }
  }