function deserialize_helloworld_HelloRequest(buffer_arg) {
  return helloworld_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}