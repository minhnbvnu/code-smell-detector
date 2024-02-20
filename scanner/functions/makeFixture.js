function makeFixture(jsonPath, entrySize, uncompressedSize, transferredSize, description) {
        return {
          jsonPath: jsonPath,
          entrySize: entrySize,
          uncompressedSize: uncompressedSize,
          transferredSize: transferredSize,
          description: description,
        };
    }