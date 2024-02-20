function Uint16BufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Uint16Array(array), itemSize, normalized);

}