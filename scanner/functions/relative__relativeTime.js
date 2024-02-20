function relative__relativeTime (number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return (typeof output === 'function') ?
              output(number, withoutSuffix, string, isFuture) :
              output.replace(/%d/i, number);
      }