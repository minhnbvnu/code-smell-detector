function findBlock(streamBytes, signature, startIndex) {
    var streamBytesLength = streamBytes.length;
    var signatureLength = signature.length;
    var scanLength = streamBytesLength - signatureLength;
    var i = startIndex,
        j,
        found = false;

    while (i < scanLength) {
      j = 0;

      while (j < signatureLength && streamBytes[i + j] === signature[j]) {
        j++;
      }

      if (j >= signatureLength) {
        i += j;

        while (i < streamBytesLength && (0, _core_utils.isWhiteSpace)(streamBytes[i])) {
          i++;
        }

        found = true;
        break;
      }

      i++;
    }

    return {
      found,
      length: i
    };
  }