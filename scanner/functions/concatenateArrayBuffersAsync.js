async function concatenateArrayBuffersAsync(asyncIterator) {
    const arrayBuffers = [];
    for await (const chunk of asyncIterator) {
      arrayBuffers.push(chunk);
    }
    return concatenateArrayBuffers(...arrayBuffers);
  }