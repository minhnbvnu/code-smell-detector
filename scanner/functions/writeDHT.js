function writeDHT() {
    writeWord(0xffc4); // marker
    writeWord(0x01a2); // length

    writeByte(0); // HTYDCinfo
    for (var i = 0; i < 16; i++) {
      writeByte(std_dc_luminance_nrcodes[i + 1]);
    }
    for (var j = 0; j <= 11; j++) {
      writeByte(std_dc_luminance_values[j]);
    }

    writeByte(0x10); // HTYACinfo
    for (var k = 0; k < 16; k++) {
      writeByte(std_ac_luminance_nrcodes[k + 1]);
    }
    for (var l = 0; l <= 161; l++) {
      writeByte(std_ac_luminance_values[l]);
    }

    writeByte(1); // HTUDCinfo
    for (var m = 0; m < 16; m++) {
      writeByte(std_dc_chrominance_nrcodes[m + 1]);
    }
    for (var n = 0; n <= 11; n++) {
      writeByte(std_dc_chrominance_values[n]);
    }

    writeByte(0x11); // HTUACinfo
    for (var o = 0; o < 16; o++) {
      writeByte(std_ac_chrominance_nrcodes[o + 1]);
    }
    for (var p = 0; p <= 161; p++) {
      writeByte(std_ac_chrominance_values[p]);
    }
  }