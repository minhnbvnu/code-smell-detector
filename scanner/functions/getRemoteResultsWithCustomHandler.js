function getRemoteResultsWithCustomHandler(str) {
        cancelHttpRequest();

        httpCanceller = $q.defer();

        scope.remoteApiHandler(str, httpCanceller.promise)
          .then(httpSuccessCallbackGen(str))
          .catch(httpErrorCallback);

        /* IE8 compatible
        scope.remoteApiHandler(str, httpCanceller.promise)
          ['then'](httpSuccessCallbackGen(str))
          ['catch'](httpErrorCallback);
        */
      }