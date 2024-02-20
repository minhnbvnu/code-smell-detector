function createPropertyMatcher(propertyTest, messagePrefix) {
    return function (property, value) {
      assertType(property, "string", "property");
      var onlyProperty = arguments.length === 1;
      var message = messagePrefix + "(\"" + property + "\"";
      if (!onlyProperty) {
        message += ", " + value;
      }
      message += ")";
      return match(function (actual) {
        if (actual === undefined || actual === null || !propertyTest(actual, property)) {
          return false;
        }
        return onlyProperty || sinon.deepEqual(value, actual[property]);
      }, message);
    };
  }