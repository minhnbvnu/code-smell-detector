function testWeekOne(year, dates, only) {
        let dom = ICAL.Time.getDominicalLetter(year);
        (only ? test.only : test)(year + " (" + dom + ")", function() {
          for (let wkday in dates) {
            let icalwkday = ICAL.Time[wkday];
            let w1st = Time.weekOneStarts(year, icalwkday);
            assert.equal(dates[wkday], w1st.toString(), wkday);

            let startOfWeek = ICAL.Time.fromString(dates[wkday]);
            assert.equal(startOfWeek.weekNumber(icalwkday), 1, wkday);
            startOfWeek.day--;
            assert.isAbove(startOfWeek.weekNumber(icalwkday), 51, wkday);
          }
        });
      }