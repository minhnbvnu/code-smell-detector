function pruneUnits(ts, units, max, digits) {
      var count = 0;

      // Calc from largest unit to smallest to prevent underflow
      if (!(units & MILLENNIA) || (count >= max)) {
        // ripple millennia down to centuries
        ts.centuries += ts.millennia * CENTURIES_PER_MILLENNIUM;
        delete ts.millennia;

      } else if (ts.millennia) {
        count++;
      }

      if (!(units & CENTURIES) || (count >= max)) {
        // ripple centuries down to decades
        ts.decades += ts.centuries * DECADES_PER_CENTURY;
        delete ts.centuries;

      } else if (ts.centuries) {
        count++;
      }

      if (!(units & DECADES) || (count >= max)) {
        // ripple decades down to years
        ts.years += ts.decades * YEARS_PER_DECADE;
        delete ts.decades;

      } else if (ts.decades) {
        count++;
      }

      if (!(units & YEARS) || (count >= max)) {
        // ripple years down to months
        ts.months += ts.years * MONTHS_PER_YEAR;
        delete ts.years;

      } else if (ts.years) {
        count++;
      }

      if (!(units & MONTHS) || (count >= max)) {
        // ripple months down to days
        if (ts.months) {
          ts.days += borrowMonths(ts.refMonth, ts.months);
        }
        delete ts.months;

        if (ts.days >= DAYS_PER_WEEK) {
          // ripple day overflow back up to weeks
          ts.weeks += floor(ts.days / DAYS_PER_WEEK);
          ts.days %= DAYS_PER_WEEK;
        }

      } else if (ts.months) {
        count++;
      }

      if (!(units & WEEKS) || (count >= max)) {
        // ripple weeks down to days
        ts.days += ts.weeks * DAYS_PER_WEEK;
        delete ts.weeks;

      } else if (ts.weeks) {
        count++;
      }

      if (!(units & DAYS) || (count >= max)) {
        //ripple days down to hours
        ts.hours += ts.days * HOURS_PER_DAY;
        delete ts.days;

      } else if (ts.days) {
        count++;
      }

      if (!(units & HOURS) || (count >= max)) {
        // ripple hours down to minutes
        ts.minutes += ts.hours * MINUTES_PER_HOUR;
        delete ts.hours;

      } else if (ts.hours) {
        count++;
      }

      if (!(units & MINUTES) || (count >= max)) {
        // ripple minutes down to seconds
        ts.seconds += ts.minutes * SECONDS_PER_MINUTE;
        delete ts.minutes;

      } else if (ts.minutes) {
        count++;
      }

      if (!(units & SECONDS) || (count >= max)) {
        // ripple seconds down to milliseconds
        ts.milliseconds += ts.seconds * MILLISECONDS_PER_SECOND;
        delete ts.seconds;

      } else if (ts.seconds) {
        count++;
      }

      // nothing to ripple milliseconds down to
      // so ripple back up to smallest existing unit as a fractional value
      if (!(units & MILLISECONDS) || (count >= max)) {
        fractional(ts, digits);
      }
    }