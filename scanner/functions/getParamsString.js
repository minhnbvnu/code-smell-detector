function getParamsString(params, dsrParams) {
    var matchParams = getMatchParams(params, dsrParams);
    function safeString(input) { return !input ? input : input.toString(); }
    var paramsToString = {};
    angular.forEach(matchParams, function(val, name) { paramsToString[name] = safeString(val); });
    return angular.toJson(paramsToString);
  }