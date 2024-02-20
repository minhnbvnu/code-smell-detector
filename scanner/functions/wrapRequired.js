function wrapRequired(callback, requireTeam, deprecationInfo) {
  return (() => {
    var _ref = (0, (_asyncToGenerator2 || _load_asyncToGenerator()).default)(function* (config, reporter, flags, args) {
      if (deprecationInfo) {
        warnDeprecation(reporter, deprecationInfo);
      }

      if (!args.length) {
        return false;
      }

      const parts = explodeScopeTeam(args[0], requireTeam, reporter);
      if (!parts) {
        return false;
      }

      reporter.step(1, 3, reporter.lang('loggingIn'));
      const revoke = yield (0, (_login || _load_login()).getToken)(config, reporter);

      const res = yield callback(parts, config, reporter, flags, args);
      if (!res) {
        return res;
      }

      reporter.step(3, 3, reporter.lang('revokingToken'));
      yield revoke();
      return true;
    });

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  })();
}