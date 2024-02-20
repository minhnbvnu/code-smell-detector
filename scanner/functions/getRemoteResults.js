function getRemoteResults(str) {
        var params = {},
            url = scope.remoteUrl + encodeURIComponent(str);
        if (scope.remoteUrlRequestFormatter) {
          params = {params: scope.remoteUrlRequestFormatter(str)};
          url = scope.remoteUrl;
        }
        if (!!scope.remoteUrlRequestWithCredentials) {
          params.withCredentials = true;
        }
        cancelHttpRequest();
        httpCanceller = $q.defer();
        params.timeout = httpCanceller.promise;
        httpCallInProgress = true;
        $http.get(url, params)
          .then(httpSuccessCallbackGen(str))
          .catch(httpErrorCallback)
          .finally(function(){httpCallInProgress=false;});
      }