function deserialize_routeguide_Feature(buffer_arg) {
  return route_guide_pb.Feature.deserializeBinary(new Uint8Array(buffer_arg));
}