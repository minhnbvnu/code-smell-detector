function getMatchParams(params, dsrParams) {
    if (dsrParams === true) dsrParams = Object.keys(params);
    if (dsrParams === null || dsrParams === undefined) dsrParams = [];

    var matchParams = {};
    angular.forEach(dsrParams.sort(), function(name) { matchParams[name] = params[name]; });
    return matchParams;
  }