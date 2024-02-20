function readBlockModel() {
    block.model = (
      getChar8(position++) +
      getChar8(position++) +
      getChar8(position++) +
      getChar8(position++)
    ).trim();
    state = constants.STATE_GET_COLOR;
  }