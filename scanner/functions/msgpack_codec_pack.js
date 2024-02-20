function msgpack_codec_pack(data) {
  return Buffer(msgpack_codec.pack(data));
}