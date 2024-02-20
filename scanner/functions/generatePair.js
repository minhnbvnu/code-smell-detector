function generatePair() {
  const keypair = ec.genKeyPair();
  window.keypair = keypair;
  return {
    publicKey: keypair.getPublic("hex"),
    privateKey: keypair.getPrivate("hex")
  };
}