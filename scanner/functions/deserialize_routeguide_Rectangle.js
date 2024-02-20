function deserialize_routeguide_Rectangle(buffer_arg) {
  return route_guide_pb.Rectangle.deserializeBinary(new Uint8Array(buffer_arg));
}