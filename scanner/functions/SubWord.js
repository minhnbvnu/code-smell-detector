function SubWord(w) {    // apply SBox to 4-byte word w
  for (var i=0; i<4; i++) w[i] = Sbox[w[i]];
  return w;
}