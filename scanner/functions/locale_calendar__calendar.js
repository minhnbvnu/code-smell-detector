function locale_calendar__calendar (key, mom, now) {
          var output = this._calendar[key];
          return typeof output === 'function' ? output.call(mom, now) : output;
      }