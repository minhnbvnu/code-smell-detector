function testRoundtrip(jcal, ical, props, only) {
        function testForType(type, valuePrefix, valueSuffix, zone) {
          let valueType = ICAL.design.vcard.value[type];
          let prefix = valuePrefix || '';
          let suffix = valueSuffix || '';
          let jcalvalue = prefix + jcal + suffix;
          let icalvalue = prefix + ical + suffix.replace(':', '');
          let zoneName = zone || valueSuffix || "floating";

          test(type + ' ' + zoneName + ' fromICAL/toICAL', function() {
            assert.equal(valueType.fromICAL(icalvalue), jcalvalue);
            assert.equal(valueType.toICAL(jcalvalue), icalvalue);
          });

          test(type + ' ' + zoneName + ' decorated/undecorated', function() {
            let prop = new ICAL.Property(['anniversary', {}, type]);
            let decorated = valueType.decorate(jcalvalue, prop);
            let undecorated = valueType.undecorate(decorated);

            assert.hasProperties(decorated._time, props);
            assert.equal(zoneName, decorated.zone.toString());
            assert.equal(undecorated, jcalvalue);
            assert.equal(decorated.toICALString(), icalvalue);
          });
        }
        (only ? suite.only : suite)(jcal, function() {

          if (props.year || props.month || props.day) {
            testForType('date-and-or-time');
            if (!props.hour && !props.minute && !props.second) {
              testForType('date');
            } else {
              testForType('date-time');
            }
          } else if (props.hour || props.minute || props.second) {
            if (!props.year && !props.month && !props.day) {
              testForType('date-and-or-time', 'T');
              testForType('date-and-or-time', 'T', 'Z', 'UTC');
              testForType('date-and-or-time', 'T', '-08:00');
              testForType('date-and-or-time', 'T', '+08:00');
              testForType('time');
              testForType('time', null, 'Z', 'UTC');
              testForType('time', null, '-08:00');
              testForType('time', null, '+08:00');
            } else {
              testForType('date-and-or-time', null);
              testForType('date-and-or-time', null, 'Z', 'UTC');
              testForType('date-and-or-time', null, '-08:00');
              testForType('date-and-or-time', null, '+08:00');
            }
          }
        });
      }