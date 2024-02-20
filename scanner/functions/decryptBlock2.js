function decryptBlock2(data, finalize) {
    var i, j, ii, sourceLength = data.length,
        buffer = this.buffer, bufferLength = this.bufferPosition,
        result = [], iv = this.iv;

    for (i = 0; i < sourceLength; ++i) {
      buffer[bufferLength] = data[i];
      ++bufferLength;
      if (bufferLength < 16) {
        continue;
      }
      // buffer is full, decrypting
      var plain = decrypt256(buffer, this.key);
      // xor-ing the IV vector to get plain text
      for (j = 0; j < 16; ++j) {
        plain[j] ^= iv[j];
      }
      iv = buffer;
      result.push(plain);
      buffer = new Uint8Array(16);
      bufferLength = 0;
    }
    // saving incomplete buffer
    this.buffer = buffer;
    this.bufferLength = bufferLength;
    this.iv = iv;
    if (result.length === 0) {
      return new Uint8Array([]);
    }
    // combining plain text blocks into one
    var outputLength = 16 * result.length;
    if (finalize) {
      // undo a padding that is described in RFC 2898
      var lastBlock = result[result.length - 1];
      var psLen = lastBlock[15];
      if (psLen <= 16) {
        for (i = 15, ii = 16 - psLen; i >= ii; --i) {
          if (lastBlock[i] !== psLen) {
            // Invalid padding, assume that the block has no padding.
            psLen = 0;
            break;
          }
        }
        outputLength -= psLen;
        result[result.length - 1] = lastBlock.subarray(0, 16 - psLen);
      }
    }
    var output = new Uint8Array(outputLength);
    for (i = 0, j = 0, ii = result.length; i < ii; ++i, j += 16) {
      output.set(result[i], j);
    }
    return output;

  }