function Uint8ClampedBufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Uint8ClampedArray(array), itemSize, normalized);

}