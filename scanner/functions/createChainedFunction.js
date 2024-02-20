function createChainedFunction() {
  var args = [].slice.call(arguments, 0);
  if (args.length === 1) {
    return args[0];
  }
  return function chainedFunction() {
    for (var i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}