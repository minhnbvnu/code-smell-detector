function encrypt128(input, key) {
    var t, u, v, k;
    var state = new Uint8Array(16);
    state.set(input);
    for (j = 0; j < 16; ++j) {
      // AddRoundKey
      state[j] ^= key[j];
    }

    for (i = 1; i < 10; i++) {
      //SubBytes
      for (j = 0; j < 16; ++j) {
        state[j] = s[state[j]];
      }
      //ShiftRows
      v = state[1];
      state[1] = state[5];
      state[5] = state[9];
      state[9] = state[13];
      state[13] = v;
      v = state[2];
      u = state[6];
      state[2] = state[10];
      state[6] = state[14];
      state[10] = v;
      state[14] = u;
      v = state[3];
      u = state[7];
      t = state[11];
      state[3] = state[15];
      state[7] = v;
      state[11] = u;
      state[15] = t;
      //MixColumns
      for (var j = 0; j < 16; j += 4) {
        var s0 = state[j + 0], s1 = state[j + 1];
        var s2 = state[j + 2], s3 = state[j + 3];
        t = s0 ^ s1 ^ s2 ^ s3;
        state[j + 0] ^= t ^ mixCol[s0 ^ s1];
        state[j + 1] ^= t ^ mixCol[s1 ^ s2];
        state[j + 2] ^= t ^ mixCol[s2 ^ s3];
        state[j + 3] ^= t ^ mixCol[s3 ^ s0];
      }
      //AddRoundKey
      for (j = 0, k = i * 16; j < 16; ++j, ++k) {
        state[j] ^= key[k];
      }
    }

    //SubBytes
    for (j = 0; j < 16; ++j) {
      state[j] = s[state[j]];
    }
    //ShiftRows
    v = state[1];
    state[1] = state[5];
    state[5] = state[9];
    state[9] = state[13];
    state[13] = v;
    v = state[2];
    u = state[6];
    state[2] = state[10];
    state[6] = state[14];
    state[10] = v;
    state[14] = u;
    v = state[3];
    u = state[7];
    t = state[11];
    state[3] = state[15];
    state[7] = v;
    state[11] = u;
    state[15] = t;
    //AddRoundKey
    for (j = 0, k = 160; j < 16; ++j, ++k) {
      state[j] ^= key[k];
    }
    return state;
  }