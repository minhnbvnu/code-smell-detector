function _harden(n) {
  return (n | BIP32_HARDENED_BIT) >>> 0;
}