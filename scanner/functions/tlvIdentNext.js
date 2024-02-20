function tlvIdentNext(stream) {
    var match;
    return (match = stream.match(tlvIdentMatch, false)) && match[2].length > 0;
  }