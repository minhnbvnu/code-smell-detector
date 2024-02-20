function requestPath(stream, state) {
    stream.eatWhile(/\S/);
    state.cur = requestProtocol;
    return "string-2";
  }