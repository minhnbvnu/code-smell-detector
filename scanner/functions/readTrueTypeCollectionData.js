function readTrueTypeCollectionData(ttc, fontName) {
        const {
          numFonts,
          offsetTable
        } = readTrueTypeCollectionHeader(ttc);

        for (let i = 0; i < numFonts; i++) {
          ttc.pos = (ttc.start || 0) + offsetTable[i];
          const potentialHeader = readOpenTypeHeader(ttc);
          const potentialTables = readTables(ttc, potentialHeader.numTables);

          if (!potentialTables.name) {
            throw new _util.FormatError('TrueType Collection font must contain a "name" table.');
          }

          const nameTable = readNameTable(potentialTables.name);

          for (let j = 0, jj = nameTable.length; j < jj; j++) {
            for (let k = 0, kk = nameTable[j].length; k < kk; k++) {
              const nameEntry = nameTable[j][k];

              if (nameEntry && nameEntry.replace(/\s/g, "") === fontName) {
                return {
                  header: potentialHeader,
                  tables: potentialTables
                };
              }
            }
          }
        }

        throw new _util.FormatError(`TrueType Collection does not contain "${fontName}" font.`);
      }