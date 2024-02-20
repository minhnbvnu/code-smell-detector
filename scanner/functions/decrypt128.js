function decrypt128(input, key) {
    var state = new Uint8Array(16);
    state.set(input);
    var i, j, k;
    var t, u, v;
    // AddRoundKey
    for (j = 0, k = 160; j < 16; ++j, ++k) {
      state[j] ^= key[k];
    }
    for (i = 9; i >= 1; --i) {
      // InvShiftRows
      t = state[13];
      state[13] = state[9];
      state[9] = state[5];
      state[5] = state[1];
      state[1] = t;
      t = state[14];
      u = state[10];
      state[14] = state[6];
      state[10] = state[2];
      state[6] = t;
      state[2] = u;
      t = state[15];
      u = state[11];
      v = state[7];
      state[15] = state[3];
      state[11] = t;
      state[7] = u;
      state[3] = v;
      // InvSubBytes
      for (j = 0; j < 16; ++j) {
        state[j] = inv_s[state[j]];
      }
      // AddRoundKey
      for (j = 0, k = i * 16; j < 16; ++j, ++k) {
        state[j] ^= key[k];
      }
      // InvMixColumns
      for (j = 0; j < 16; j += 4) {
        var s0 = mix[state[j]], s1 = mix[state[j + 1]],
          s2 = mix[state[j + 2]], s3 = mix[state[j + 3]];
        t = (s0 ^ (s1 >>> 8) ^ (s1 << 24) ^ (s2 >>> 16) ^ (s2 << 16) ^
          (s3 >>> 24) ^ (s3 << 8));
        state[j] = (t >>> 24) & 0xFF;
        state[j + 1] = (t >> 16) & 0xFF;
        state[j + 2] = (t >> 8) & 0xFF;
        state[j + 3] = t & 0xFF;
      }
    }
    // InvShiftRows
    t = state[13];
    state[13] = state[9];
    state[9] = state[5];
    state[5] = state[1];
    state[1] = t;
    t = state[14];
    u = state[10];
    state[14] = state[6];
    state[10] = state[2];
    state[6] = t;
    state[2] = u;
    t = state[15];
    u = state[11];
    v = state[7];
    state[15] = state[3];
    state[11] = t;
    state[7] = u;
    state[3] = v;
    for (j = 0; j < 16; ++j) {
      // InvSubBytes
      state[j] = inv_s[state[j]];
      // AddRoundKey
      state[j] ^= key[j];
    }
    return state;
  }