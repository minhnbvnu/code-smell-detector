function readTrueTypeCollectionHeader(ttc) {
        const ttcTag = (0, _util.bytesToString)(ttc.getBytes(4));
        (0, _util.assert)(ttcTag === "ttcf", "Must be a TrueType Collection font.");
        const majorVersion = ttc.getUint16();
        const minorVersion = ttc.getUint16();
        const numFonts = ttc.getInt32() >>> 0;
        const offsetTable = [];

        for (let i = 0; i < numFonts; i++) {
          offsetTable.push(ttc.getInt32() >>> 0);
        }

        const header = {
          ttcTag,
          majorVersion,
          minorVersion,
          numFonts,
          offsetTable
        };

        switch (majorVersion) {
          case 1:
            return header;

          case 2:
            header.dsigTag = ttc.getInt32() >>> 0;
            header.dsigLength = ttc.getInt32() >>> 0;
            header.dsigOffset = ttc.getInt32() >>> 0;
            return header;
        }

        throw new _util.FormatError(`Invalid TrueType Collection majorVersion: ${majorVersion}.`);
      }