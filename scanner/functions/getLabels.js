function getLabels() {
          var values = valuesFn(scope);
          var toDisplay;
          if (values && isArray(values)) {
            toDisplay = new Array(values.length);
            for (var i = 0, ii = values.length; i < ii; i++) {
              toDisplay[i] = callExpression(displayFn, i, values[i]);
            }
            return toDisplay;
          } else if (values) {
            // TODO: Add a test for this case
            toDisplay = {};
            for (var prop in values) {
              if (values.hasOwnProperty(prop)) {
                toDisplay[prop] = callExpression(displayFn, prop, values[prop]);
              }
            }
          }
          return toDisplay;
        }