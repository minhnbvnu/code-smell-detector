function assert_response_array_equivalent(actual, expected, description) {
      assert_true(Array.isArray(actual), description);
      assert_equals(actual.length, expected.length, description);
      expected.forEach(function (expected_element) {
        // assert_response_in_array treats the first argument as being
        // 'actual', and the second as being 'expected array'. We are
        // switching them around because we want to be resilient
        // against the |actual| array containing duplicates.
        assert_response_in_array(expected_element, actual, description);
      });
    }