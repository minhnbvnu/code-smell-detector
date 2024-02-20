function serialize_helloworld_Request(arg) {
  if (!(arg instanceof test_protos_multi_pb.Request)) {
    throw new Error('Expected argument of type helloworld.Request');
  }
  return Buffer.from(arg.serializeBinary());
}