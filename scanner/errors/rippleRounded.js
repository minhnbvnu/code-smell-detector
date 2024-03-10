function rippleRounded(ts, toUnit) {
      switch (toUnit) {
        case 'seconds':
          if (ts.seconds !== SECONDS_PER_MINUTE || isNaN(ts.minutes)) {
            return;
          }
          // ripple seconds up to minutes
          ts.minutes++;
          ts.seconds = 0;

        /* falls through */
        case 'minutes':
          if (ts.minutes !== MINUTES_PER_HOUR || isNaN(ts.hours)) {
            return;
          }
          // ripple minutes up to hours
          ts.hours++;
          ts.minutes = 0;

        /* falls through */
        case 'hours':
          if (ts.hours !== HOURS_PER_DAY || isNaN(ts.days)) {
            return;
          }
          // ripple hours up to days
          ts.days++;
          ts.hours = 0;

        /* falls through */
        case 'days':
          if (ts.days !== DAYS_PER_WEEK || isNaN(ts.weeks)) {
            return;
          }
          // ripple days up to weeks
          ts.weeks++;
          ts.days = 0;

        /* falls through */
        case 'weeks':
          if (ts.weeks !== daysPerMonth(ts.refMonth) / DAYS_PER_WEEK || isNaN(ts.months)) {
            return;
          }
          // ripple weeks up to months
          ts.months++;
          ts.weeks = 0;

        /* falls through */
        case 'months':
          if (ts.months !== MONTHS_PER_YEAR || isNaN(ts.years)) {
            return;
          }
          // ripple months up to years
          ts.years++;
          ts.months = 0;

        /* falls through */
        case 'years':
          if (ts.years !== YEARS_PER_DECADE || isNaN(ts.decades)) {
            return;
          }
          // ripple years up to decades
          ts.decades++;
          ts.years = 0;

        /* falls through */
        case 'decades':
          if (ts.decades !== DECADES_PER_CENTURY || isNaN(ts.centuries)) {
            return;
          }
          // ripple decades up to centuries
          ts.centuries++;
          ts.decades = 0;

        /* falls through */
        case 'centuries':
          if (ts.centuries !== CENTURIES_PER_MILLENNIUM || isNaN(ts.millennia)) {
            return;
          }
          // ripple centuries up to millennia
          ts.millennia++;
          ts.centuries = 0;
        /* falls through */
      }
    }