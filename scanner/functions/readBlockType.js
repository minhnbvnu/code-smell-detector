function readBlockType() {
    block.type = constants.READ_COLOR_TYPES[buffer.readUInt16BE(position)];
    position += 2;
    state = constants.STATE_GET_MODE;
  }