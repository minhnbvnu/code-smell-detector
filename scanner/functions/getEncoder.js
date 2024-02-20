function getEncoder(codec) {
  return new codec.encoder(null, codec);
}