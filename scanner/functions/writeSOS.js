function writeSOS() {
    writeWord(0xffda); // marker
    writeWord(12); // length
    writeByte(3); // nrofcomponents
    writeByte(1); // IdY
    writeByte(0); // HTY
    writeByte(2); // IdU
    writeByte(0x11); // HTU
    writeByte(3); // IdV
    writeByte(0x11); // HTV
    writeByte(0); // Ss
    writeByte(0x3f); // Se
    writeByte(0); // Bf
  }