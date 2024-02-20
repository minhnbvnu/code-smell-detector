function getBlock (self) {
  self._prev = self._cipher.encryptBlock(self._prev)
  return self._prev
}