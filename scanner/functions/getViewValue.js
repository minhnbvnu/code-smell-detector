function getViewValue(key, value) {
          if (key === '?') {
            return undefined;
          } else if (key === '') {
            return null;
          } else {
            var viewValueFn = selectAsFn ? selectAsFn : valueFn;
            return callExpression(viewValueFn, key, value);
          }
        }