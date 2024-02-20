function serializeIntegrity(integrity) {
  // We need this because `Integrity.toString()` does not use sorting to ensure a stable string output
  // See https://git.io/vx2Hy
  return integrity.toString().split(' ').sort().join(' ');
}