function deserialize_routeguide_RouteNote(buffer_arg) {
  return route_guide_pb.RouteNote.deserializeBinary(new Uint8Array(buffer_arg));
}