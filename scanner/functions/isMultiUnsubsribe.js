function isMultiUnsubsribe (path, data) {
  return path.indexOf('/unsubscribes') && data && Array.isArray(data)
}