function ie10IsDataView(obj) {
    return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
  }