function testDateProperties(str, data, only) {
      (only ? test.only : test)(str, function() {
        let dt = Time.fromString(str);
        assert.equal(data.isDate, dt.isDate);
        assert.equal(data.year, dt.year);
        assert.equal(data.month, dt.month);
        assert.equal(data.day, dt.day);
        assert.equal(data.hour, dt.hour);
        assert.equal(data.minute, dt.minute);
        assert.equal(data.second, dt.second);
        assert.equal(data.leap_year, Time.isLeapYear(dt.year));
        assert.equal(data.dayOfWeek, dt.dayOfWeek().toString());
        assert.equal(data.dayOfYear, dt.dayOfYear().toString());
        assert.equal(data.startOfWeek, dt.startOfWeek().toString());
        assert.equal(data.endOfWeek, dt.endOfWeek().toString());
        assert.equal(data.startOfMonth, dt.startOfMonth().toString());
        assert.equal(data.endOfMonth, dt.endOfMonth().toString());
        assert.equal(data.startOfYear, dt.startOfYear().toString());
        assert.equal(data.endOfYear, dt.endOfYear().toString());
        assert.equal(data.startDoyWeek, dt.startDoyWeek(Time.SUNDAY));
        assert.equal(data.weekNumber, dt.weekNumber(Time.SUNDAY));
        assert.equal(data.getDominicalLetter, dt.getDominicalLetter());
        // TODO nthWeekDay

        dt = new Time();
        dt.resetTo(data.year, data.month, data.day, data.hour, data.minute,
                   data.second, Timezone.utcTimezone);
        assert.equal(data.year, dt.year);
        assert.equal(data.month, dt.month);
        assert.equal(data.day, dt.day);
        assert.equal(data.hour, dt.hour);
        assert.equal(data.minute, dt.minute);
        assert.equal(data.second, dt.second);
      });
    }