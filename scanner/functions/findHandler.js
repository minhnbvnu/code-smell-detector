function findHandler(state, path, queryParams) {
    var handlers = state.handlers, regex = state.regex;
    var captures = path.match(regex), currentCapture = 1;
    var result = new RecognizeResults(queryParams);

    for (var i=0, l=handlers.length; i<l; i++) {
      var handler = handlers[i], names = handler.names, params = {};

      for (var j=0, m=names.length; j<m; j++) {
        params[names[j]] = captures[currentCapture++];
      }

      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
    }

    return result;
  }