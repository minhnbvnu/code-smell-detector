function moment_format__toISOString () {
          var m = this.clone().utc();
          if (0 < m.year() && m.year() <= 9999) {
              if ('function' === typeof Date.prototype.toISOString) {
                  // native implementation is ~50x faster, use it when we can
                  return this.toDate().toISOString();
              } else {
                  return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
              }
          } else {
              return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
          }
      }