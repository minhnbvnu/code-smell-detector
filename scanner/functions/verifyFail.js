function verifyFail(data) {
      test('invalid input "' + JSON.stringify(data) + '"', function() {
        assert.throws(function() {
          ICAL.Recur.fromString(data);
        });
      });
    }