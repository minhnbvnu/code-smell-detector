function concatenateString(side) {

    if (side === "rightSide") {
      return function (stringValue) {
        return stringValue + "String";
      };
    }
    if (side === "leftSide") {

      return function (stringValue) {
        return "String"+stringValue;
      };
    }
  }