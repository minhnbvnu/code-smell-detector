function getDecoder(codec) {
  return new codec.decoder(null, codec);
}