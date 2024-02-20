function Float32BufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Float32Array(array), itemSize, normalized);

}