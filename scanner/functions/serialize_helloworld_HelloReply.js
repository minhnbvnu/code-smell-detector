function serialize_helloworld_HelloReply(arg) {
  if (!(arg instanceof helloworld_pb.HelloReply)) {
    throw new Error('Expected argument of type helloworld.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}