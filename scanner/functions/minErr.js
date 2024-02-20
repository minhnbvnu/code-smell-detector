function minErr(module, ErrorConstructor) {
  ErrorConstructor = ErrorConstructor || Error;
  return function() {
    var SKIP_INDEXES = 2;

    var templateArgs = arguments,
      code = templateArgs[0],
      message = '[' + (module ? module + ':' : '') + code + '] ',
      template = templateArgs[1],
      paramPrefix, i;

    message += template.replace(/\{\d+\}/g, function(match) {
      var index = +match.slice(1, -1),
        shiftedIndex = index + SKIP_INDEXES;

      if (shiftedIndex < templateArgs.length) {
        return toDebugString(templateArgs[shiftedIndex]);
      }

      return match;
    });

    message += '\nhttp://errors.angularjs.org/1.5.3/' +
      (module ? module + '/' : '') + code;

    for (i = SKIP_INDEXES, paramPrefix = '?'; i < templateArgs.length; i++, paramPrefix = '&') {
      message += paramPrefix + 'p' + (i - SKIP_INDEXES) + '=' +
        encodeURIComponent(toDebugString(templateArgs[i]));
    }

    return new ErrorConstructor(message);
  };
}