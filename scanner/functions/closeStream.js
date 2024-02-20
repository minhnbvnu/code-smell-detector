function closeStream() {
  // purge remaining items in chunk
  purgeQueue()
  isStreamClosed = true
}