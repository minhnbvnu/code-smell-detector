function readableStreamInstance(paramsBuffer) {
  let current = 0;
  return new stream.Readable({
    read(size) {
      if (current + size >= paramsBuffer.length) { size = paramsBuffer.length - current; }

      this.push(paramsBuffer.slice(current, current + size));

      current += size;

      if (current >= paramsBuffer.length) { this.push(null); }
    }
  });
}