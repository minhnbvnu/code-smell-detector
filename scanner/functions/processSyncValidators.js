function processSyncValidators() {
      var syncValidatorsValid = true;
      forEach(ctrl.$validators, function(validator, name) {
        var result = validator(modelValue, viewValue);
        syncValidatorsValid = syncValidatorsValid && result;
        setValidity(name, result);
      });
      if (!syncValidatorsValid) {
        forEach(ctrl.$asyncValidators, function(v, name) {
          setValidity(name, null);
        });
        return false;
      }
      return true;
    }