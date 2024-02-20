function getPBEXVIZType(arrayBuffer) {
  const strippedBuffer = new Uint8Array(arrayBuffer, 4);
  // TODO: this toObject is too expensive, we can do
  // this with decode only
  const envelope = XVIZ_PROTOBUF_MESSAGE.Envelope.toObject(strippedBuffer, {
    enum: String
  });

  return envelope.type;
}