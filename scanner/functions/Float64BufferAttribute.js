function Float64BufferAttribute(array, itemSize, normalized) {

  BufferAttribute.call(this, new Float64Array(array), itemSize, normalized);

}