function textNodeIfPrimitive(node) {
    return typeof node === 'object' ? node : document.createTextNode(node);
  }