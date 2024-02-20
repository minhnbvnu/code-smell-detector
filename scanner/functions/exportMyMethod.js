function exportMyMethod(api) {
    api.myMethod = function () {
      return 'Not implemented';
    };
    api.getData = function () {
      return $http.get('http://www.mocky.io/v2/553e0de62f711b7b1aa5d24f')
          .then(function (response) {return response.data; });     
    };
  }