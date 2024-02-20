function serialize_routeguide_Feature(arg) {
  if (!(arg instanceof route_guide_pb.Feature)) {
    throw new Error('Expected argument of type routeguide.Feature');
  }
  return Buffer.from(arg.serializeBinary());
}