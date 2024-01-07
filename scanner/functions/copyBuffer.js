function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}