function InterleavedBufferAttribute(interleavedBuffer, itemSize, offset, normalized) {

  this.data = interleavedBuffer;
  this.itemSize = itemSize;
  this.offset = offset;

  this.normalized = normalized === true;

}