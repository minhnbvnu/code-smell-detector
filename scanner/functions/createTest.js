function createTest(property, setUp, tearDown) {
    return function () {
      if (setUp) {
        setUp.apply(this, arguments);
      }

      var exception, result;

      try {
        result = property.apply(this, arguments);
      } catch (e) {
        exception = e;
      }

      if (tearDown) {
        tearDown.apply(this, arguments);
      }

      if (exception) {
        throw exception;
      }

      return result;
    };
  }