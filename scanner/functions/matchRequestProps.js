function matchRequestProps(source, propsToMatch, requestData) {
        if (propsToMatch === "" || propsToMatch === "*") {
          return true;
        }
        var isMatched;
        var parsedData = parseMatchProps(propsToMatch);
        if (!isValidParsedData(parsedData)) {
          logMessage(source, "Invalid parameter: ".concat(propsToMatch));
          isMatched = false;
        } else {
          var matchData = getMatchPropsData(parsedData);
          var matchKeys = Object.keys(matchData);
          isMatched = matchKeys.every(function (matchKey) {
            var matchValue = matchData[matchKey];
            var dataValue = requestData[matchKey];
            return Object.prototype.hasOwnProperty.call(requestData, matchKey) && typeof dataValue === "string" && (matchValue === null || matchValue === void 0 ? void 0 : matchValue.test(dataValue));
          });
        }
        return isMatched;
      }