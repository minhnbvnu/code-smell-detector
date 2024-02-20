function computeHuffmanTbl(nrcodes, std_table) {
    var codevalue = 0;
    var pos_in_table = 0;
    var HT = new Array();
    for (var k = 1; k <= 16; k++) {
      for (var j = 1; j <= nrcodes[k]; j++) {
        HT[std_table[pos_in_table]] = [];
        HT[std_table[pos_in_table]][0] = codevalue;
        HT[std_table[pos_in_table]][1] = k;
        pos_in_table++;
        codevalue++;
      }
      codevalue *= 2;
    }
    return HT;
  }