function deserialize_helloworld_HelloReply(buffer_arg) {
  return helloworld_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}