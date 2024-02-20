function deserialize_routeguide_Point(buffer_arg) {
  return route_guide_pb.Point.deserializeBinary(new Uint8Array(buffer_arg));
}