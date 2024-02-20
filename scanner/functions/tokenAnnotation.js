function tokenAnnotation(stream, state) {
    stream.match(/.*?(?=,|;|{|}|\(|\)|=|$|\s)/);
    if (stream.match(/^{/)) {
      state.nestedParameters++;
    } else if (stream.match(/^}/) && state.nestedParameters > 0) {
      state.nestedParameters--;
    }
    if (state.nestedParameters > 0) {
      stream.match(/.*?(?={|})/) || stream.next();
    } else if (state.nestedParameters == 0) {
      state.tokenize = tokenBase;
    }
    return "builtin";
  }