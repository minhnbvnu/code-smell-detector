function assertOffset (offset, length) {
  if (typeof offset !== 'number' || offset !== offset) { // eslint-disable-line no-self-compare
    throw new TypeError('offset must be a number')
  }

  if (offset > kMaxUint32 || offset < 0) {
    throw new TypeError('offset must be a uint32')
  }

  if (offset > kBufferMaxLength || offset > length) {
    throw new RangeError('offset out of range')
  }
}