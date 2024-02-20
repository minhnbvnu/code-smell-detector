function verifyTzidHandling(eventProp, icalProp) {

      let time;
      let property;
      setup(function() {
        property = subject.component.getFirstProperty(icalProp);

        assert.ok(
          property.getParameter('tzid'),
          'has tzid'
        );

        assert.isFalse(
          property.getParameter('tzid') === testTzid
        );
      });

      test('to floating time', function() {
        subject[eventProp] = time = new ICAL.Time({
          year: 2012,
          month: 1,
          day: 1,
          minute: 30,
          isDate: false
        });

        assert.ok(
          !property.getParameter('tzid'), 'removes tzid'
        );

        assert.include(
          property.toICALString(),
          time.toICALString()
        );
      });

      test('to utc time', function() {
        subject[eventProp] = time = new ICAL.Time({
          year: 2013,
          month: 1,
          day: 1,
          minute: 30,
          isDate: false,
          timezone: 'Z'
        });

        assert.ok(
          !property.getParameter('tzid'),
          'removes tzid'
        );

        assert.include(
          property.toICALString(),
          time.toICALString()
        );
      });

      test('to another timezone', function() {
        subject[eventProp] = time = new ICAL.Time({
          year: 2013,
          month: 1,
          day: 1,
          minute: 30,
          isDate: false,
          timezone: testTzid
        });

        assert.equal(
          property.getParameter('tzid'),
          testTzid
        );

        assert.include(
          property.toICALString(),
          time.toICALString()
        );
      });

      test('type date-time -> date', function() {
        // ensure we are in the right time type
        property.resetType('date-time');

        subject[eventProp] = time = new ICAL.Time({
          year: 2013,
          month: 1,
          day: 1,
          isDate: true
        });

        assert.equal(property.type, 'date');

        assert.include(
          property.toICALString(),
          time.toICALString()
        );
      });

      test('type date -> date-time', function() {
        // ensure we are in the right time type
        property.resetType('date');

        subject[eventProp] = time = new ICAL.Time({
          year: 2013,
          month: 1,
          day: 1,
          hour: 3,
          isDate: false
        });

        assert.equal(property.type, 'date-time');

        assert.include(
          property.toICALString(),
          time.toICALString()
        );
      });
    }