function validateOperator(op) {
        if (typeof op !== 'string') {
          throw new TypeError('Invalid operator type, expected string but got ' + typeof op);
        }

        if (allowedOperators.indexOf(op) === -1) {
          throw new TypeError('Invalid operator, expected one of ' + allowedOperators.join('|'));
        }
      }