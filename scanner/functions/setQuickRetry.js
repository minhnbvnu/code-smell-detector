function setQuickRetry (peerInfo) {
  peerInfo.proven = true
  peerInfo.reconnect(true)
  peerInfo.attempts = 1
}