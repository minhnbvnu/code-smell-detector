function testRRULE(ruleString, options) {
    let runner = options.only ? test.only : test;
    runner(ruleString, function() {
      if (!options.dtStart) {
        options.dtStart = options.dates[0];
      }

      let start = ICAL.Time.fromString(options.dtStart);
      let recur = ICAL.Recur.fromString(ruleString);
      if (options.throws) {
        assert.throws(function() {
          recur.iterator(start);
        });
        return;
      }
      let iterator = recur.iterator(start);

      let inc = 0;
      let dates = [];
      let next, max;

      if ('max' in options) {
        max = options.max;
      } else if (recur.isFinite()) {
        max = options.dates.length + 1;
      } else {
        max = options.dates.length;
      }

      assert.equal(recur.isFinite(), options.byCount || options.until || false);
      assert.equal(recur.isByCount(), options.byCount || false);

      while (inc++ < max && (next = iterator.next())) {
        dates.push(next.toString());
      }
      assert.deepEqual(dates, options.dates || []);
    });
  }