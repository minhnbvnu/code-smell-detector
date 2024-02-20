function storeSegment(obj, segment) {
  if (obj) {
    obj[symbols.segment] = segment || this.getSegment()
  }
}