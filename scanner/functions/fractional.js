function fractional(ts, digits) {
      var frac = fraction(ts, 0, 'milliseconds', 'seconds', MILLISECONDS_PER_SECOND, digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'seconds', 'minutes', SECONDS_PER_MINUTE, digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'minutes', 'hours', MINUTES_PER_HOUR, digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'hours', 'days', HOURS_PER_DAY, digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'days', 'weeks', DAYS_PER_WEEK, digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'weeks', 'months', daysPerMonth(ts.refMonth) / DAYS_PER_WEEK, digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'months', 'years', daysPerYear(ts.refMonth) / daysPerMonth(ts.refMonth), digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'years', 'decades', YEARS_PER_DECADE, digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'decades', 'centuries', DECADES_PER_CENTURY, digits);
      if (!frac) { return; }

      frac = fraction(ts, frac, 'centuries', 'millennia', CENTURIES_PER_MILLENNIUM, digits);

      // should never reach this with remaining fractional value
      if (frac) { throw new Error('Fractional unit overflow'); }
    }