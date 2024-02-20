function failFirstLine(stream, state) {
    stream.skipToEnd();
    state.cur = header;
    return "error";
  }