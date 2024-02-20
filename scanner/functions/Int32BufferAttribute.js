function Int32BufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Int32Array(array), itemSize, normalized);

}