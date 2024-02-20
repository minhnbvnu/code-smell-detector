function newToken(type, value) {
    return {
      type: type,
      value: value,
      line: line,
      column: column
    };
  }