function assert_response_in_array(actual, expected_array, description) {
      assert_true(expected_array.some(function (element) {
        try {
          assert_response_equals(actual, element);
          return true;
        } catch (e) {
          return false;
        }
      }), description);
    }