function BinaryShape() {
  Shape.apply(this, arguments);
  this.toType = util.base64.decode;
  this.toWireFormat = util.base64.encode;
}