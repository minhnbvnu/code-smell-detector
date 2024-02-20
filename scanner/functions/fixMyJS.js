function fixMyJS(data, src, options) {
      var code = new Code(src);
      var warnings = data.errors || [];
      var results = [];
      var config = data.options || {};
      var current = 0;

// merge custom options into config
      if (options) {
        Object.keys(options).forEach(function (option) {
          config[option] = options[option];
        });
      }

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

      resetResults();


// fixMyJS API
//
// * getErrors
// * getAllErrors
// * getCode
// * next
//   * fix
//   * getDetails
// * run
      var api = {
// returns are supported errors that can be fixed.
        getErrors: function () {
          return results.slice(0);
        },

        getAllErrors: function () {
          return warnings.slice(0);
        },

// returns the current state of the code.
        getCode: function () {
          return code.getCode();
        },

// Iterator method. Returns Boolean if there is a next item
//
// Example:
// while (af.hasNext()) {
//   var a = af.next();
// }
        hasNext: function () {
          return (current < results.length);
        },

// Iterator method. Iterates through each error in the
// Array and returns an Object with fix and getDetails methods.
// if the end of the Array is reached then an error is thrown.
//
// fix function will fix the current error and return the state of the code.
// getDetails will return a prototype of the current error's details
        next: function () {
          if (!this.hasNext()) {
            throw new Error('End of list.');
          }

          var r = copyResults(results[current], config);
          var data = {
            fix: function () {
              fixError(r, code);
              return code.getCode();
            },
            fixVerbose: function () {
              return {
                original: code._src[r.line],
                replacement: fixError(r, code)
              };
            },
            getDetails: function () {
              return Object.create(r);
            }
          };
          current += 1;
          return data;
        },

        filterErrors: function (fn) {
          warnings = warnings.map(function (w) {
            w.fixable = fn(w);
            return w;
          });
          resetResults();
          return warnings.slice(0);
        },

// runs through all errors and fixes them.
// returns the fixed code.
//
// **returnErrors** Boolean - true if you'd like an Array of all errors
// with the proposed fix.
//
// returns the code String || an Array of JSHint errors.
        run: function (returnErrors) {
          if (returnErrors) {
            return warnings
              .slice(0)
              .sort(byPriority)
              .map(function (v) {
                v.fixable && (v.fix = fixError(copyResults(v, config), code));
                return v;
              });
          } else {
            results.forEach(fixErrors(code, config));
            return code.getCode();
          }
        },

        runVerbose: function () {
          var lint = [];
          var dup = {};
          var next;
          while (api.hasNext()) {
            next = api.next();
            lint.push(copyResults(next.fixVerbose(), next.getDetails()));
          }
          return lint.reverse().filter(function (x) {
            if (dup.hasOwnProperty(x.original)) {
              return false;
            }
            x.line = x.config.line;
            dup[x.original] = x;
            return true;
          });
        }
      };

      return api;
    }