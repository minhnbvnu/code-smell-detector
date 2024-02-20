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