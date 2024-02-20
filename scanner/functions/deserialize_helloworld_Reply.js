function deserialize_helloworld_Reply(buffer_arg) {
  return test_protos_multi_pb.Reply.deserializeBinary(new Uint8Array(buffer_arg));
}