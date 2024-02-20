function isEventString(options) {
  return options.event && !fs.pathExistsSync(options.event);
}