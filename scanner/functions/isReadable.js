function isReadable (obj) {
  return isStream(obj) && typeof obj._read == 'function' && typeof obj._readableState == 'object'
}