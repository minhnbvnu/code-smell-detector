function parseUint64Value(buffer) {
    const dataView = new DataView(buffer);
    const left = dataView.getUint32(0, true);
    const right = dataView.getUint32(4, true);
    return left + 2 ** 32 * right;
  }