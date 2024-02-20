function eatPnLocal(stream) {
    while (stream.match(/([:\w\d._-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-fA-F0-9][a-fA-F0-9])/));
  }