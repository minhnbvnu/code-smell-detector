function responseStatusText(stream, state) {
    stream.skipToEnd();
    state.cur = header;
    return null;
  }