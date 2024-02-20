function writeBuffers(stream, buffers) {
  buffers.forEach(buffer => stream.write(buffer));
  return new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', () => resolve());
    stream.end();
  });
}