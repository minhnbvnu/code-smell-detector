function assert_request_equals(actual, expected, description) {
      assert_class_string(actual, "Request", description);
      ["url"].forEach(function (attribute) {
        assert_equals(actual[attribute], expected[attribute],
          description + " Attributes differ: " + attribute + ".");
      });
      assert_header_equals(actual.headers, expected.headers, description);
    }