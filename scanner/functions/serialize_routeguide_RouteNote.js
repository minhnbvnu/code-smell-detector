function serialize_routeguide_RouteNote(arg) {
  if (!(arg instanceof route_guide_pb.RouteNote)) {
    throw new Error('Expected argument of type routeguide.RouteNote');
  }
  return Buffer.from(arg.serializeBinary());
}