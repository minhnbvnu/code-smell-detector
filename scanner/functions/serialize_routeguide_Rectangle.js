function serialize_routeguide_Rectangle(arg) {
  if (!(arg instanceof route_guide_pb.Rectangle)) {
    throw new Error('Expected argument of type routeguide.Rectangle');
  }
  return Buffer.from(arg.serializeBinary());
}