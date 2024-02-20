function getNumberFromString(rawString) {
        var parsedDelay = parseInt(rawString, 10);
        var validDelay = nativeIsNaN(parsedDelay) ? null : parsedDelay;
        return validDelay;
      }