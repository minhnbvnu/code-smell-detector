function defineBigIntMethod(fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}