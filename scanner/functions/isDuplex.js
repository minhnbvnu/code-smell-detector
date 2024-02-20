function isDuplex (obj) {
  return isReadable(obj) && isWritable(obj)
}