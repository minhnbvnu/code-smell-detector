function unexpectedClose(type) {
    throw new Error(util.format('child process unexpectedly closed: %s', type))
  }