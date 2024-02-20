function shouldForceRelaying (code) {
  return (code === 'HOLEPUNCH_ABORTED') ||
    (code === 'HOLEPUNCH_DOUBLE_RANDOMIZED_NATS') ||
    (code === 'REMOTE_NOT_HOLEPUNCHABLE')
}