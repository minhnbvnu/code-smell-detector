function formatAnnotatorParams(params) /*?object*/ {
  if ((!params.params || params.params.length === 0) && !params.returns) {
    return null;
  }
  var annotatorParams = {};
  if (params.params && params.params.length > 0) {
    var paramTypes = [];
    params.params.forEach(function(paramArray) {
      paramTypes.push(paramArray[1]);
    });
    annotatorParams.params = paramTypes;
  }

  if (params.returns) {
    annotatorParams.returns = params.returns;
  }

  return annotatorParams;
}