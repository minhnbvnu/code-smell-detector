function createIsSelectedFn(viewValue) {
          var selectedSet;
          if (multiple) {
            if (trackFn && isArray(viewValue)) {

              selectedSet = new HashMap([]);
              for (var trackIndex = 0; trackIndex < viewValue.length; trackIndex++) {
                // tracking by key
                selectedSet.put(callExpression(trackFn, null, viewValue[trackIndex]), true);
              }
            } else {
              selectedSet = new HashMap(viewValue);
            }
          } else if (trackFn) {
            viewValue = callExpression(trackFn, null, viewValue);
          }

          return function isSelected(key, value) {
            var compareValueFn;
            if (trackFn) {
              compareValueFn = trackFn;
            } else if (selectAsFn) {
              compareValueFn = selectAsFn;
            } else {
              compareValueFn = valueFn;
            }

            if (multiple) {
              return isDefined(selectedSet.remove(callExpression(compareValueFn, key, value)));
            } else {
              return viewValue === callExpression(compareValueFn, key, value);
            }
          };
        }