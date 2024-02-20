function readBlockName() {
    var length = buffer.readUInt16BE(position);
    var name = '';
    while (--length) {
      name += getChar16(position += 2);
    }
    position += 4;
    block.name = name;
    if(mode === constants.MODE_GROUP) {
      state = constants.STATE_GET_MODE;
    }
    else {
      state = constants.STATE_GET_MODEL;
    }
  }