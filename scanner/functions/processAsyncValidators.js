function processAsyncValidators() {
      var validatorPromises = [];
      var allValid = true;
      forEach(ctrl.$asyncValidators, function(validator, name) {
        var promise = validator(modelValue, viewValue);
        if (!isPromiseLike(promise)) {
          throw ngModelMinErr('nopromise',
            "Expected asynchronous validator to return a promise but got '{0}' instead.", promise);
        }
        setValidity(name, undefined);
        validatorPromises.push(promise.then(function() {
          setValidity(name, true);
        }, function() {
          allValid = false;
          setValidity(name, false);
        }));
      });
      if (!validatorPromises.length) {
        validationDone(true);
      } else {
        $q.all(validatorPromises).then(function() {
          validationDone(allValid);
        }, noop);
      }
    }