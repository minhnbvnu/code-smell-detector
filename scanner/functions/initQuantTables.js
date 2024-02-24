function initQuantTables(sf) {
    var YQT = [
      16,
      11,
      10,
      16,
      24,
      40,
      51,
      61,
      12,
      12,
      14,
      19,
      26,
      58,
      60,
      55,
      14,
      13,
      16,
      24,
      40,
      57,
      69,
      56,
      14,
      17,
      22,
      29,
      51,
      87,
      80,
      62,
      18,
      22,
      37,
      56,
      68,
      109,
      103,
      77,
      24,
      35,
      55,
      64,
      81,
      104,
      113,
      92,
      49,
      64,
      78,
      87,
      103,
      121,
      120,
      101,
      72,
      92,
      95,
      98,
      112,
      100,
      103,
      99
    ];

    for (var i = 0; i < 64; i++) {
      var t = ffloor((YQT[i] * sf + 50) / 100);
      t = Math.min(Math.max(t, 1), 255);
      YTable[ZigZag[i]] = t;
    }
    var UVQT = [
      17,
      18,
      24,
      47,
      99,
      99,
      99,
      99,
      18,
      21,
      26,
      66,
      99,
      99,
      99,
      99,
      24,
      26,
      56,
      99,
      99,
      99,
      99,
      99,
      47,
      66,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99,
      99
    ];
    for (var j = 0; j < 64; j++) {
      var u = ffloor((UVQT[j] * sf + 50) / 100);
      u = Math.min(Math.max(u, 1), 255);
      UVTable[ZigZag[j]] = u;
    }
    var aasf = [
      1.0,
      1.387039845,
      1.306562965,
      1.175875602,
      1.0,
      0.785694958,
      0.5411961,
      0.275899379
    ];
    var k = 0;
    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        fdtbl_Y[k] = 1.0 / (YTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0);
        fdtbl_UV[k] = 1.0 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0);
        k++;
      }
    }
  }