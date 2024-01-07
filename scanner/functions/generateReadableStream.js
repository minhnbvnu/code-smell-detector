function generateReadableStream(length = 1024 * 1024, chunkSize = 10 * 1024, sleep = 50) {
  return stream.Readable.from(async function* (){
    let dataLength = 0;

    while(dataLength < length) {
      const leftBytes = length - dataLength;

      const chunk = Buffer.alloc(leftBytes > chunkSize? chunkSize : leftBytes);

      dataLength += chunk.length;

      yield chunk;

      if (sleep) {
        await setTimeoutAsync(sleep);
      }
    }
  }());
}