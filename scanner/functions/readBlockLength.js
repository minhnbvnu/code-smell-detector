function readBlockLength() {
    //doesn't appear to be reading the block length correctly
    //does on the first block, but then fails on the second.
    blockLength = buffer.readUInt32BE(position);
    position += 4;
    state = constants.STATE_GET_NAME;
  }