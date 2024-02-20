function realToken(type,stream) {
    return aToken(stream.current(),
                 stream.column(),
                 stream.indentation(),
                 type);
  }