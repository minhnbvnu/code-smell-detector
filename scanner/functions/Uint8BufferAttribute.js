function Uint8BufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Uint8Array(array), itemSize, normalized);

}