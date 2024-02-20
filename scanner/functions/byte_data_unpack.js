function byte_data_unpack(buffer, theType, index=0, clamp=false) {
  return unpackArray(
    buffer, theType, index, index + Math.ceil(theType.bits / 8),
    true, clamp)[0];
}