function makeParamsString(paramName, paramValues) {
    return paramValues.map(function(value) {
      return paramName + "=" + value;
    }).join("&");
  }