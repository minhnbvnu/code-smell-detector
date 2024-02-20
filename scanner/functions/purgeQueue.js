function purgeQueue() {
  // save chunk and reset it
  forkChunk(chunk)
  chunk = []
}