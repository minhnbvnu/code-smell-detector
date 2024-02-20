function httpErrorCallback(errorRes, status, headers, config) {
        scope.searching = httpCallInProgress;

        // normalize return obejct from promise
        if (!status && !headers && !config) {
          status = errorRes.status;
        }

        // cancelled/aborted
        if (status === 0 || status === -1) { return; }
        if (scope.remoteUrlErrorCallback) {
          scope.remoteUrlErrorCallback(errorRes, status, headers, config);
        }
        else {
          if (console && console.error) {
            console.error('http error');
          }
        }
      }