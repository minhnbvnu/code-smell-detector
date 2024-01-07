function readBit() {
      if (bitsCount > 0) {
        bitsCount--;
        return bitsData >> bitsCount & 1;
      }

      bitsData = data[offset++];

      if (bitsData === 0xff) {
        var nextByte = data[offset++];

        if (nextByte) {
          if (nextByte === 0xdc && parseDNLMarker) {
            offset += 2;
            const scanLines = (0, _core_utils.readUint16)(data, offset);
            offset += 2;

            if (scanLines > 0 && scanLines !== frame.scanLines) {
              throw new DNLMarkerError("Found DNL marker (0xFFDC) while parsing scan data", scanLines);
            }
          } else if (nextByte === 0xd9) {
            if (parseDNLMarker) {
              const maybeScanLines = blockRow * (frame.precision === 8 ? 8 : 0);

              if (maybeScanLines > 0 && Math.round(frame.scanLines / maybeScanLines) >= 10) {
                throw new DNLMarkerError("Found EOI marker (0xFFD9) while parsing scan data, " + "possibly caused by incorrect `scanLines` parameter", maybeScanLines);
              }
            }

            throw new EOIMarkerError("Found EOI marker (0xFFD9) while parsing scan data");
          }

          throw new JpegError(`unexpected marker ${(bitsData << 8 | nextByte).toString(16)}`);
        }
      }

      bitsCount = 7;
      return bitsData >>> 7;
    }