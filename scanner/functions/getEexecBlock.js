function getEexecBlock(stream, suggestedLength) {
    var eexecBytes = stream.getBytes();
    return {
      stream: new _stream.Stream(eexecBytes),
      length: eexecBytes.length
    };
  }