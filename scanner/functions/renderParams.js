function renderParams(/*?object*/ params) /*string*/ {
  if (params == null) {
    return null;
  }

  var formattedParams = [];
  if (params.params && params.params.length > 0) {
    var preCond = params.params;
    var joined = preCond.map(function(cond) {
      return '[' + cond.join(', ') + ']';
    }).join(', ');
    var paramString = '\"params\":' + '[' + joined + ']';
    formattedParams.push(paramString);
  }

  if (params.returns) {
    var returnParam = '\"returns\":' + '\'' + params.returns + '\'';
    formattedParams.push(returnParam);
  }
  return '{' + formattedParams.join(',') + '}';
}