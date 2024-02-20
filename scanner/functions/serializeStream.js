function serializeStream(stream) {
      // 1. Let token be the result of reading from stream.
      // (Done in-place on array, rather than as a stream)

      // 2. If encoding is UTF-8, UTF-16BE, or UTF-16LE, and ignore
      // BOM flag and BOM seen flag are unset, run these subsubsteps:
      if (includes(['UTF-8', 'UTF-16LE', 'UTF-16BE'], this._encoding.name) &&
          !this._ignoreBOM && !this._BOMseen) {
        if (stream.length > 0 && stream[0] === 0xFEFF) {
          // 1. If token is U+FEFF, set BOM seen flag.
          this._BOMseen = true;
          stream.shift();
        } else if (stream.length > 0) {
          // 2. Otherwise, if token is not end-of-stream, set BOM seen
          // flag and append token to stream.
          this._BOMseen = true;
        } else {
          // 3. Otherwise, if token is not end-of-stream, append token
          // to output.
          // (no-op)
        }
      }
      // 4. Otherwise, return output.
      return codePointsToString(stream);
    }