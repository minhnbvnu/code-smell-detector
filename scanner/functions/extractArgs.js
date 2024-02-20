function extractArgs(fn) {
  var fnText = fn.toString().replace(STRIP_COMMENTS, ''),
      args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
  return args;
}