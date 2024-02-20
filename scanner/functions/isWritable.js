function isWritable (obj) {
  return isStream(obj) && typeof obj._write == 'function' && typeof obj._writableState == 'object'
}