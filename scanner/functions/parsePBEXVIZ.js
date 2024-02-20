function parsePBEXVIZ(arrayBuffer, opts = {}) {
  const {messageType} = opts;
  const xviz = {
    type: messageType,
    data: null
  };

  let data = arrayBuffer;

  // If the type has been provided, it means there is no Envelope so skip that step
  if (!xviz.type) {
    const strippedBuffer = new Uint8Array(arrayBuffer, 4);
    const envelope = XVIZ_PROTOBUF_MESSAGE.Envelope.decode(strippedBuffer);
    xviz.type = envelope.type;
    data = envelope.data.value;
  }

  switch (xviz.type) {
    case 'xviz/metadata':
      const tmpMeta = XVIZ_PROTOBUF_MESSAGE.Metadata.decode(data);
      xviz.data = postProcessProtobuf(tmpMeta);
      postProcessUIConfig(xviz.data);
      break;
    case 'xviz/state_update':
      const tmpState = XVIZ_PROTOBUF_MESSAGE.StateUpdate.decode(data);
      xviz.data = postProcessProtobuf(tmpState);
      break;
    default:
      throw new Error(`Unknown Message type ${xviz.type}`);
  }

  return xviz;
}