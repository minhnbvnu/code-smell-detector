function writeDQT() {
    writeWord(0xffdb); // marker
    writeWord(132); // length
    writeByte(0);
    for (var i = 0; i < 64; i++) {
      writeByte(YTable[i]);
    }
    writeByte(1);
    for (var j = 0; j < 64; j++) {
      writeByte(UVTable[j]);
    }
  }