async function* makeBlobIterator(blob, options) {
    const chunkSize = options?.chunkSize || DEFAULT_CHUNK_SIZE3;
    let offset = 0;
    while (offset < blob.size) {
      const end = offset + chunkSize;
      const chunk = await blob.slice(offset, end).arrayBuffer();
      offset = end;
      yield chunk;
    }
  }