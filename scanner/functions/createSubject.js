function createSubject(file) {
    setup(async function() {
      let icsData = await testSupport.loadSample(file);
      let exceptions = [];

      await new Promise((resolve) => {
        let parse = new ICAL.ComponentParser();

        parse.onevent = function(event) {
          if (event.isRecurrenceException()) {
            exceptions.push(event);
          } else {
            primary = event;
          }
        };

        parse.oncomplete = function() {
          exceptions.forEach(primary.relateException, primary);
          subject = new ICAL.RecurExpansion({
            component: primary.component,
            dtstart: primary.startDate
          });

          resolve();
        };
        parse.process(icsData);
      });

    });
  }