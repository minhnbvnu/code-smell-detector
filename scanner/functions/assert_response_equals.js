function assert_response_equals(actual, expected, description) {
      assert_class_string(actual, "Response", description);
      ["type", "url", "status", "ok", "statusText"].forEach(function (attribute) {
        assert_equals(actual[attribute], expected[attribute],
          description + " Attributes differ: " + attribute + ".");
      });
      assert_header_equals(actual.headers, expected.headers, description);
    }