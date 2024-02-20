function deprecatedWarning(oldMethod, newMethod) {
    var warn = console.warn || console.log;
    warn && warn.call(console, 'navBarController.' + oldMethod + ' is deprecated, please use ' + newMethod + ' instead');
  }