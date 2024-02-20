function isResponseMethod(args) {
  if (args.length > 1) {
    var arg = args[args.length - 2];
    if (
      typeof arg == 'object' &&
      arg != null &&
      'send' in arg &&
      'render' in arg &&
      typeof arg['send'] == 'function' &&
      typeof arg['render'] == 'function'
    ) {
      return true;
    }
  }
  return false;
}