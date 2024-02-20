function httpSuccessCallbackGen(str) {
        return function(responseData, status, headers, config) {
          // normalize return obejct from promise
          if (!status && !headers && !config && responseData.data) {
            responseData = responseData.data;
          }
          scope.searching = false;
          processResults(
            extractValue(responseFormatter(responseData), scope.remoteUrlDataField),
            str);
        };
      }