async function readFileChunk(filePath, start, size) {
  const fd = await fs.open(filePath, 'r');
  const chunkBuf = Buffer.alloc(size);
  const { bytesRead } = await fs.read(fd, chunkBuf, 0, size, start);
  if (bytesRead !== size) {
    throw new Error(`ReadChunkFile function bytesRead not equal read size`);
  }
  await fs.close(fd);
  return chunkBuf;
}