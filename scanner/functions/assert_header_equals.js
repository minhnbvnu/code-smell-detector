function assert_header_equals(actual, expected, description) {
      assert_class_string(actual, "Headers", description);
      var header;
      var actual_headers = [];
      var expected_headers = [];
      for (header of actual)
        actual_headers.push(header[0] + ": " + header[1]);
      for (header of expected)
        expected_headers.push(header[0] + ": " + header[1]);
      assert_array_equals(actual_headers, expected_headers,
        description + " Headers differ.");
    }