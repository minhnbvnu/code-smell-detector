function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}