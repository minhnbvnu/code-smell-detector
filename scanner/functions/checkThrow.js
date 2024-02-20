function checkThrow(data, expectedMessage, dtstart, stack) {
      test(expectedMessage, function() {
        let recur = new ICAL.Recur(data);
        if (dtstart) {
          dtstart = ICAL.Time.fromString(dtstart);
        } else {
          dtstart = ICAL.Time.epochTime.clone();
        }
        assert.throws(function() {
          recur.iterator(dtstart);
        }, expectedMessage);
      });
    }