function getHeaderBlock(stream, suggestedLength) {
    var EEXEC_SIGNATURE = [0x65, 0x65, 0x78, 0x65, 0x63];
    var streamStartPos = stream.pos;
    var headerBytes, headerBytesLength, block;

    try {
      headerBytes = stream.getBytes(suggestedLength);
      headerBytesLength = headerBytes.length;
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }
    }

    if (headerBytesLength === suggestedLength) {
      block = findBlock(headerBytes, EEXEC_SIGNATURE, suggestedLength - 2 * EEXEC_SIGNATURE.length);

      if (block.found && block.length === suggestedLength) {
        return {
          stream: new _stream.Stream(headerBytes),
          length: suggestedLength
        };
      }
    }

    (0, _util.warn)('Invalid "Length1" property in Type1 font -- trying to recover.');
    stream.pos = streamStartPos;
    var SCAN_BLOCK_LENGTH = 2048;
    var actualLength;

    while (true) {
      var scanBytes = stream.peekBytes(SCAN_BLOCK_LENGTH);
      block = findBlock(scanBytes, EEXEC_SIGNATURE, 0);

      if (block.length === 0) {
        break;
      }

      stream.pos += block.length;

      if (block.found) {
        actualLength = stream.pos - streamStartPos;
        break;
      }
    }

    stream.pos = streamStartPos;

    if (actualLength) {
      return {
        stream: new _stream.Stream(stream.getBytes(actualLength)),
        length: actualLength
      };
    }

    (0, _util.warn)('Unable to recover "Length1" property in Type1 font -- using as is.');
    return {
      stream: new _stream.Stream(stream.getBytes(suggestedLength)),
      length: suggestedLength
    };
  }