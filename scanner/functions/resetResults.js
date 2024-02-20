function resetResults() {
        var dupes = {};
// Filter out errors we don't support.
// If the error is null then we immediately return false
// Then we check for duplicate errors. Sometimes JSHint will complain
// about the same thing twice. This is a safeguard.
// Otherwise we return true if we support this error.
        results = warnings.filter(function (v) {
          if (!v) {
            return false;
          }

          var err = 'line' + v.line +
                    'char' + v.character +
                    'reason' + v.reason;

          if (dupes.hasOwnProperty(err)) {
            return false;
          }
          dupes[err] = v;

          if (v.hasOwnProperty('fixable')) {
            return v.fixable;
          }

          return (v.fixable = errors.hasOwnProperty(v.code));
        });

// sorts errors by priority.
        results.sort(byPriority);
      }