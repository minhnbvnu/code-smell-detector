function jumpPosition(position, str, end) {
  const len = end - position.index
  return feedPosition(position, str, len)
}