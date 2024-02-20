function serializeScalar(xml, value, shape) {
  xml.txt(shape.toWireFormat(value));
}