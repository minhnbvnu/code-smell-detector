function wrapRequiredUser(callback, subCommandDeprecated) {
  return wrapRequired(function (parts, config, reporter, flags, args) {
    if (args.length === 2) {
      return callback((0, (_extends2 || _load_extends()).default)({
        user: args[1]
      }, parts), config, reporter, flags, args);
    } else {
      return false;
    }
  }, true, subCommandDeprecated);
}