function Int16BufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Int16Array(array), itemSize, normalized);

}