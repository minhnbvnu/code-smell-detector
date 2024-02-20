function delegateToCalls(api, method, matchAny, actual, notCalled) {
      api[method] = function () {
        if (!this.called) {
          if (notCalled) {
            return notCalled.apply(this, arguments);
          }
          return false;
        }

        var currentCall;
        var matches = 0;

        for (var i = 0, l = this.callCount; i < l; i += 1) {
          currentCall = this.getCall(i);

          if (currentCall[actual || method].apply(currentCall, arguments)) {
            matches += 1;

            if (matchAny) {
              return true;
            }
          }
        }

        return matches === this.callCount;
      };
    }