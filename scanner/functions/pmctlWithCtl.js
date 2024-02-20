function pmctlWithCtl(control) {
  return function pmctl(args) {
    control = control || process.env.STRONGLOOP_PM;
    args = [].slice.call(arguments);
    return ['--control', control].concat(args);
  };
}