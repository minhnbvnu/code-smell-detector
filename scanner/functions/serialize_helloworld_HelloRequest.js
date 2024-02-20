function serialize_helloworld_HelloRequest(arg) {
  if (!(arg instanceof helloworld_pb.HelloRequest)) {
    throw new Error('Expected argument of type helloworld.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}