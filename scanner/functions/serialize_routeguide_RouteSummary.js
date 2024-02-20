function serialize_routeguide_RouteSummary(arg) {
  if (!(arg instanceof route_guide_pb.RouteSummary)) {
    throw new Error('Expected argument of type routeguide.RouteSummary');
  }
  return Buffer.from(arg.serializeBinary());
}