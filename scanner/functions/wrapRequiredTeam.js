function wrapRequiredTeam(callback, requireTeam = true, subCommandDeprecated) {
  return wrapRequired(function (parts, config, reporter, flags, args) {
    if (args.length === 1) {
      return callback(parts, config, reporter, flags, args);
    } else {
      return false;
    }
  }, requireTeam, subCommandDeprecated);
}