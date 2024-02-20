function deserialize_routeguide_RouteSummary(buffer_arg) {
  return route_guide_pb.RouteSummary.deserializeBinary(new Uint8Array(buffer_arg));
}