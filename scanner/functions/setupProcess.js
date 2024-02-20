function setupProcess(options) {
      setup(function(done) {
        events.length = 0;
        timezones.length = 0;

        subject = new ICAL.ComponentParser(options);

        subject.onrecurrenceexception = function(item) {
          exceptions.push(item);
        };

        subject.onevent = function(event) {
          events.push(event);
        };

        subject.ontimezone = function(tz) {
          timezones.push(tz);
        };

        subject.oncomplete = function() {
          done();
        };

        subject.process(ICAL.parse(icsData));
      });
    }