function processDU(CDU, fdtbl, DC, HTDC, HTAC) {
    var EOB = HTAC[0x00];
    var M16zeroes = HTAC[0xf0];
    var pos;
    var I16 = 16;
    var I63 = 63;
    var I64 = 64;
    var DU_DCT = fDCTQuant(CDU, fdtbl);
    //ZigZag reorder
    for (var j = 0; j < I64; ++j) {
      DU[ZigZag[j]] = DU_DCT[j];
    }
    var Diff = DU[0] - DC;
    DC = DU[0];
    //Encode DC
    if (Diff == 0) {
      writeBits(HTDC[0]); // Diff might be 0
    } else {
      pos = 32767 + Diff;
      writeBits(HTDC[category[pos]]);
      writeBits(bitcode[pos]);
    }
    //Encode ACs
    var end0pos = 63; // was const... which is crazy
    while (end0pos > 0 && DU[end0pos] == 0) {
      end0pos--;
    }
    //end0pos = first element in reverse order !=0
    if (end0pos == 0) {
      writeBits(EOB);
      return DC;
    }
    var i = 1;
    var lng;
    while (i <= end0pos) {
      var startpos = i;
      while (DU[i] == 0 && i <= end0pos) {
        ++i;
      }
      var nrzeroes = i - startpos;
      if (nrzeroes >= I16) {
        lng = nrzeroes >> 4;
        for (var nrmarker = 1; nrmarker <= lng; ++nrmarker)
          writeBits(M16zeroes);
        nrzeroes = nrzeroes & 0xf;
      }
      pos = 32767 + DU[i];
      writeBits(HTAC[(nrzeroes << 4) + category[pos]]);
      writeBits(bitcode[pos]);
      i++;
    }
    if (end0pos != I63) {
      writeBits(EOB);
    }
    return DC;
  }