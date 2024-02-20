function readBytes(ptr, size) {
  const bytes = new Uint8Array(size)
  for (let i=0; i<size; i++) bytes[i] = Module.getValue(ptr+i, 'i8')
  return bytes
}