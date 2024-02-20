function extractPropertyChunks (stateObject, chunkNames) {
      var extractedValues = {};
      var currentChunkName, chunkNamesLength = chunkNames.length;

      for (var i = 0; i < chunkNamesLength; i++) {
        currentChunkName = chunkNames[i];
        extractedValues[currentChunkName] = stateObject[currentChunkName];
        delete stateObject[currentChunkName];
      }

      return extractedValues;
    }