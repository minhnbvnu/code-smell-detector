function verifySignature(message, signature, publicKey) {
  try {
    const keypair = ec.keyFromPublic(publicKey, "hex");
    return ec.verify(message, signature, keypair);
  } catch (error) {
    return false;
  }
}