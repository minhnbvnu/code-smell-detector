function addToQueue(comb) {
  chunk.push(comb)
  if (chunk.length >= CHUNK_SIZE) {
    purgeQueue()
  }
}