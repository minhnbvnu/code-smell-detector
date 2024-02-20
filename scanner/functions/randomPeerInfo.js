function randomPeerInfo () {
  return new PeerInfo({
    publicKey: crypto.randomBytes(32)
  })
}