function parentToken(tokens, index) {
    const targetLevel = tokens[index].level - 1;
    for (let i = index - 1; i >= 0; i--) {
      if (tokens[i].level === targetLevel) {
        return i;
      }
    }
    return -1;
  }