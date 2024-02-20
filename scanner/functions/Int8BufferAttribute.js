function Int8BufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Int8Array(array), itemSize, normalized);

}