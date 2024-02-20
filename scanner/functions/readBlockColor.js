function readBlockColor() {
    var model = block.model.toUpperCase();
    var count = constants.COLOR_SIZES[model];
    var channels = [];

    while (count--) {
      channels.push(buffer.readFloatBE(position));
      position += 4;
    }

    block.color = channels;
    state = constants.STATE_GET_TYPE;
  }