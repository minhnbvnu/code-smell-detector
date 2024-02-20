function serialize_routeguide_Point(arg) {
  if (!(arg instanceof route_guide_pb.Point)) {
    throw new Error('Expected argument of type routeguide.Point');
  }
  return Buffer.from(arg.serializeBinary());
}