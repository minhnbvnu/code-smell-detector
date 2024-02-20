function instanceMethodCaller(methodName) {
        return function caller() {
          var handle = this.handle;
          var args = arguments;
          var foundInstancesCount = 0;
          var returnValue;

          this._instances.forEach(function(instance) {
            if ((!handle || handle == instance.$$delegateHandle) && instance.$$filterFn(instance)) {
              foundInstancesCount++;
              var ret = instance[methodName].apply(instance, args);
              //Only return the value from the first call
              if (foundInstancesCount === 1) {
                returnValue = ret;
              }
            }
          });

          if (!foundInstancesCount && handle) {
            return $log.warn(
              'Delegate for handle "' + handle + '" could not find a ' +
              'corresponding element with delegate-handle="' + handle + '"! ' +
              methodName + '() was not called!\n' +
              'Possible cause: If you are calling ' + methodName + '() immediately, and ' +
              'your element with delegate-handle="' + handle + '" is a child of your ' +
              'controller, then your element may not be compiled yet. Put a $timeout ' +
              'around your call to ' + methodName + '() and try again.'
            );
          }
          return returnValue;
        };
      }