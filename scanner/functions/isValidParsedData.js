function isValidParsedData(data) {
        return Object.values(data).every(function (value) {
          return isValidStrPattern(value);
        });
      }