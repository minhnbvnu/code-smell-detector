function setUnresponsive (peerInfo) {
  peerInfo.proven = false
  peerInfo.reconnect(true)
  peerInfo.attempts = 4
}