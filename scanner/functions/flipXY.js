function flipXY(flatCoordinates, offset, end, stride, dest, destOffset) {
  if (dest !== undefined) {
    dest = dest;
    destOffset = destOffset !== undefined ? destOffset : 0;
  } else {
    dest = [];
    destOffset = 0;
  }
  let j = offset;
  while (j < end) {
    const x = flatCoordinates[j++];
    dest[destOffset++] = flatCoordinates[j++];
    dest[destOffset++] = x;
    for (let k = 2; k < stride; ++k) {
      dest[destOffset++] = flatCoordinates[j++];
    }
  }
  dest.length = destOffset;
  return dest;
}