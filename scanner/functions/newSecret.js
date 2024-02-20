function newSecret() {
  return sjcl.codec.base64.fromBits(sjcl.random.randomWords(8, 10), 0);
}