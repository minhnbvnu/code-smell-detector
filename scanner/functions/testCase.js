function testCase(tests, prefix) {
    /*jsl:ignore*/
    if (!tests || typeof tests != "object") {
      throw new TypeError("sinon.testCase needs an object with test functions");
    }
    /*jsl:end*/

    prefix = prefix || "test";
    var rPrefix = new RegExp("^" + prefix);
    var methods = {}, testName, property, method;
    var setUp = tests.setUp;
    var tearDown = tests.tearDown;

    for (testName in tests) {
      if (tests.hasOwnProperty(testName)) {
        property = tests[testName];

        if (/^(setUp|tearDown)$/.test(testName)) {
          continue;
        }

        if (typeof property == "function" && rPrefix.test(testName)) {
          method = property;

          if (setUp || tearDown) {
            method = createTest(property, setUp, tearDown);
          }

          methods[testName] = sinon.test(method);
        } else {
          methods[testName] = tests[testName];
        }
      }
    }

    return methods;
  }