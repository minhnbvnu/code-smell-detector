function* nextChunk(textSource) {
  let currentPosition = 0;
  const CHUNK_SIZE = 10;

  while (currentPosition < textSource.length) {
    const chunk = textSource.slice(
      currentPosition,
      currentPosition + CHUNK_SIZE
    );
    currentPosition += CHUNK_SIZE;

    const encoder = new TextEncoder();
    const encodedChunk = encoder.encode(chunk);

    yield encodedChunk;
  }
}