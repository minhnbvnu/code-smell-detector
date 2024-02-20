function addToDate(ts, date) {
      date = (date instanceof Date) || ((date !== null) && isFinite(date)) ? new Date(+date) : new Date();
      if (!ts) {
        return date;
      }

      // if there is a value field, use it directly
      var value = +ts.value || 0;
      if (value) {
        date.setTime(date.getTime() + value);
        return date;
      }

      value = +ts.milliseconds || 0;
      if (value) {
        date.setMilliseconds(date.getMilliseconds() + value);
      }

      value = +ts.seconds || 0;
      if (value) {
        date.setSeconds(date.getSeconds() + value);
      }

      value = +ts.minutes || 0;
      if (value) {
        date.setMinutes(date.getMinutes() + value);
      }

      value = +ts.hours || 0;
      if (value) {
        date.setHours(date.getHours() + value);
      }

      value = +ts.weeks || 0;
      if (value) {
        value *= DAYS_PER_WEEK;
      }

      value += +ts.days || 0;
      if (value) {
        date.setDate(date.getDate() + value);
      }

      value = +ts.months || 0;
      if (value) {
        date.setMonth(date.getMonth() + value);
      }

      value = +ts.millennia || 0;
      if (value) {
        value *= CENTURIES_PER_MILLENNIUM;
      }

      value += +ts.centuries || 0;
      if (value) {
        value *= DECADES_PER_CENTURY;
      }

      value += +ts.decades || 0;
      if (value) {
        value *= YEARS_PER_DECADE;
      }

      value += +ts.years || 0;
      if (value) {
        date.setFullYear(date.getFullYear() + value);
      }

      return date;
    }