function int32ToByteArray(int32) {
  // we want to represent the input as a 4-bytes array
  const byteArray = new Uint8Array(4)

  for (let i = 0; i < byteArray.length; i++) {
    const byte = int32 & 0xff
    byteArray[i] = byte
    int32 = (int32 - byte) / 256
  }

  return byteArray
}