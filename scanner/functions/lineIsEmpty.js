function lineIsEmpty(line) {
    return !line || !/\S/.test(line.string)
  }