function readBlockMode() {
    switch (buffer.readUInt16BE(position)) {
      case constants.COLOR_START:
        colors.push(block = color = {});
        mode = constants.MODE_COLOR;
        break;
      case constants.GROUP_START:
        groups.push(block = group = { colors: [] });
        mode = constants.MODE_GROUP;
        break;
      case constants.GROUP_END:
        group = null;
        break;

      default:
        throw new Error('Unexpected block type at byte #' + position);
    }

    if (group && block === color) {
      group.colors.push(color);
    }

    position += 2;
    state = constants.STATE_GET_LENGTH;
  }