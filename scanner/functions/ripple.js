function ripple(ts) {
      var x;

      if (ts.milliseconds < 0) {
        // ripple seconds down to milliseconds
        x = ceil(-ts.milliseconds / MILLISECONDS_PER_SECOND);
        ts.seconds -= x;
        ts.milliseconds += x * MILLISECONDS_PER_SECOND;

      } else if (ts.milliseconds >= MILLISECONDS_PER_SECOND) {
        // ripple milliseconds up to seconds
        ts.seconds += floor(ts.milliseconds / MILLISECONDS_PER_SECOND);
        ts.milliseconds %= MILLISECONDS_PER_SECOND;
      }

      if (ts.seconds < 0) {
        // ripple minutes down to seconds
        x = ceil(-ts.seconds / SECONDS_PER_MINUTE);
        ts.minutes -= x;
        ts.seconds += x * SECONDS_PER_MINUTE;

      } else if (ts.seconds >= SECONDS_PER_MINUTE) {
        // ripple seconds up to minutes
        ts.minutes += floor(ts.seconds / SECONDS_PER_MINUTE);
        ts.seconds %= SECONDS_PER_MINUTE;
      }

      if (ts.minutes < 0) {
        // ripple hours down to minutes
        x = ceil(-ts.minutes / MINUTES_PER_HOUR);
        ts.hours -= x;
        ts.minutes += x * MINUTES_PER_HOUR;

      } else if (ts.minutes >= MINUTES_PER_HOUR) {
        // ripple minutes up to hours
        ts.hours += floor(ts.minutes / MINUTES_PER_HOUR);
        ts.minutes %= MINUTES_PER_HOUR;
      }

      if (ts.hours < 0) {
        // ripple days down to hours
        x = ceil(-ts.hours / HOURS_PER_DAY);
        ts.days -= x;
        ts.hours += x * HOURS_PER_DAY;

      } else if (ts.hours >= HOURS_PER_DAY) {
        // ripple hours up to days
        ts.days += floor(ts.hours / HOURS_PER_DAY);
        ts.hours %= HOURS_PER_DAY;
      }

      while (ts.days < 0) {
        // NOTE: never actually seen this loop more than once

        // ripple months down to days
        ts.months--;
        ts.days += borrowMonths(ts.refMonth, 1);
      }

      // weeks is always zero here

      if (ts.days >= DAYS_PER_WEEK) {
        // ripple days up to weeks
        ts.weeks += floor(ts.days / DAYS_PER_WEEK);
        ts.days %= DAYS_PER_WEEK;
      }

      if (ts.months < 0) {
        // ripple years down to months
        x = ceil(-ts.months / MONTHS_PER_YEAR);
        ts.years -= x;
        ts.months += x * MONTHS_PER_YEAR;

      } else if (ts.months >= MONTHS_PER_YEAR) {
        // ripple months up to years
        ts.years += floor(ts.months / MONTHS_PER_YEAR);
        ts.months %= MONTHS_PER_YEAR;
      }

      // years is always non-negative here
      // decades, centuries and millennia are always zero here

      if (ts.years >= YEARS_PER_DECADE) {
        // ripple years up to decades
        ts.decades += floor(ts.years / YEARS_PER_DECADE);
        ts.years %= YEARS_PER_DECADE;

        if (ts.decades >= DECADES_PER_CENTURY) {
          // ripple decades up to centuries
          ts.centuries += floor(ts.decades / DECADES_PER_CENTURY);
          ts.decades %= DECADES_PER_CENTURY;

          if (ts.centuries >= CENTURIES_PER_MILLENNIUM) {
            // ripple centuries up to millennia
            ts.millennia += floor(ts.centuries / CENTURIES_PER_MILLENNIUM);
            ts.centuries %= CENTURIES_PER_MILLENNIUM;
          }
        }
      }
    }