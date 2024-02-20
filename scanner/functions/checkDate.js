function checkDate(data, last, dtstart) {
      let name = JSON.stringify(data);
      // XXX: better names
      test('RULE: ' + name, function() {
        let recur = new ICAL.Recur(data);
        if (dtstart) {
          dtstart = ICAL.Time.fromString(dtstart);
        } else {
          dtstart = ICAL.Time.epochTime.clone();
        }
        let iter = recur.iterator(dtstart);
        assert.equal(iter.next().toString(), last);
      });
    }