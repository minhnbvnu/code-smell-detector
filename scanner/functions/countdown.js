function countdown(start, end, units, max, digits) {
      var callback;

      // ensure some units or use defaults
      units = +units || DEFAULTS;
      // max must be positive
      max = (max > 0) ? max : NaN;
      // clamp digits to an integer between [0, 20]
      digits = (digits > 0) ? (digits < 20) ? Math.round(digits) : 20 : 0;

      // ensure start date
      var startTS = null;
      if ('function' === typeof start) {
        callback = start;
        start = null;

      } else if (!(start instanceof Date)) {
        if ((start !== null) && isFinite(start)) {
          start = new Date(+start);
        } else {
          if ('object' === typeof startTS) {
            startTS = /** @type{Timespan} */(start);
          }
          start = null;
        }
      }

      // ensure end date
      var endTS = null;
      if ('function' === typeof end) {
        callback = end;
        end = null;

      } else if (!(end instanceof Date)) {
        if ((end !== null) && isFinite(end)) {
          end = new Date(+end);
        } else {
          if ('object' === typeof end) {
            endTS = /** @type{Timespan} */(end);
          }
          end = null;
        }
      }

      // must wait to interpret timespans until after resolving dates
      if (startTS) {
        start = addToDate(startTS, end);
      }
      if (endTS) {
        end = addToDate(endTS, start);
      }

      if (!start && !end) {
        // used for unit testing
        return new Timespan();
      }

      if (!callback) {
        return populate(new Timespan(), /** @type{Date} */(start), /** @type{Date} */(end), /** @type{number} */(units), /** @type{number} */(max), /** @type{number} */(digits));
      }

      // base delay off units
      var delay = getDelay(units),
        timerId,
        fn = function () {
          callback(
            populate(new Timespan(), /** @type{Date} */(start), /** @type{Date} */(end), /** @type{number} */(units), /** @type{number} */(max), /** @type{number} */(digits)),
            timerId
          );
        };

      fn();
      return (timerId = setInterval(fn, delay));
    }