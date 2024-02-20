function deserialize_helloworld_Request(buffer_arg) {
  return test_protos_multi_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}