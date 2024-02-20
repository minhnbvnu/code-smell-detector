function assert_response_array_equals(actual, expected, description) {
      assert_true(Array.isArray(actual), description);
      assert_equals(actual.length, expected.length, description);
      actual.forEach(function (value, index) {
        assert_response_equals(value, expected[index],
          description + " : object[" + index + "]");
      });
    }