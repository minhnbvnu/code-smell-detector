constructor(stream, encrypted, seacAnalysisEnabled) {
      if (encrypted) {
        const data = stream.getBytes();
        const isBinary = !((isHexDigit(data[0]) || (0, _core_utils.isWhiteSpace)(data[0])) && isHexDigit(data[1]) && isHexDigit(data[2]) && isHexDigit(data[3]) && isHexDigit(data[4]) && isHexDigit(data[5]) && isHexDigit(data[6]) && isHexDigit(data[7]));
        stream = new _stream.Stream(isBinary ? decrypt(data, EEXEC_ENCRYPT_KEY, 4) : decryptAscii(data, EEXEC_ENCRYPT_KEY, 4));
      }

      this.seacAnalysisEnabled = !!seacAnalysisEnabled;
      this.stream = stream;
      this.nextChar();
    }