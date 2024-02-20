function generateRandomResponse(customResponseText) {
        var customResponse = customResponseText;
        if (customResponse === "true") {
          customResponse = Math.random().toString(36).slice(-10);
          return customResponse;
        }
        customResponse = customResponse.replace("length:", "");
        var rangeRegex = /^\d+-\d+$/;
        if (!rangeRegex.test(customResponse)) {
          return null;
        }
        var rangeMin = getNumberFromString(customResponse.split("-")[0]);
        var rangeMax = getNumberFromString(customResponse.split("-")[1]);
        if (!nativeIsFinite(rangeMin) || !nativeIsFinite(rangeMax)) {
          return null;
        }
        if (rangeMin > rangeMax) {
          var temp = rangeMin;
          rangeMin = rangeMax;
          rangeMax = temp;
        }
        var LENGTH_RANGE_LIMIT = 500 * 1e3;
        if (rangeMax > LENGTH_RANGE_LIMIT) {
          return null;
        }
        var length = getRandomIntInclusive(rangeMin, rangeMax);
        customResponse = getRandomStrByLength(length);
        return customResponse;
      }