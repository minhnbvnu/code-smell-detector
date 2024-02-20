function MixColumns(s, Nb) {   // combine bytes of each col of state S [§5.1.3]
  for (var c=0; c<4; c++) {
    var a = new Array(4);  // 'a' is a copy of the current column from 's'
    var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
    for (var i=0; i<4; i++) {
      a[i] = s[i][c];
      b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;
    }
    // a[n] ^ b[n] is a•{03} in GF(2^8)
    s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
    s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
    s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
    s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
  }
  return s;
}