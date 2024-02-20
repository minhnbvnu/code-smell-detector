function Uint32BufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Uint32Array(array), itemSize, normalized);

}