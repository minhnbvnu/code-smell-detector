function getValuesList (stateObject, chunkNames) {
      getValuesList_accumulator.length = 0;
      var chunkNamesLength = chunkNames.length;

      for (var i = 0; i < chunkNamesLength; i++) {
        getValuesList_accumulator.push(stateObject[chunkNames[i]]);
      }

      return getValuesList_accumulator;
    }