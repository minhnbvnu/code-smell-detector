function serialize_helloworld_Reply(arg) {
  if (!(arg instanceof test_protos_multi_pb.Reply)) {
    throw new Error('Expected argument of type helloworld.Reply');
  }
  return Buffer.from(arg.serializeBinary());
}