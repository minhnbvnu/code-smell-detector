function processParseErrors() {
      var errorKey = ctrl.$$parserName || 'parse';
      if (isUndefined(parserValid)) {
        setValidity(errorKey, null);
      } else {
        if (!parserValid) {
          forEach(ctrl.$validators, function(v, name) {
            setValidity(name, null);
          });
          forEach(ctrl.$asyncValidators, function(v, name) {
            setValidity(name, null);
          });
        }
        // Set the parse error last, to prevent unsetting it, should a $validators key == parserName
        setValidity(errorKey, parserValid);
        return parserValid;
      }
      return true;
    }