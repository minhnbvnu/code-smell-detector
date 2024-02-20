function checkOne(info, config, ignoreEngines) {
  let didIgnore = false;
  let didError = false;
  const reporter = config.reporter;
  const human = `${info.name}@${info.version}`;

  const pushError = msg => {
    const ref = info._reference;

    if (ref && ref.optional) {
      ref.ignore = true;
      ref.incompatible = true;

      reporter.info(`${human}: ${msg}`);
      if (!didIgnore) {
        reporter.info(reporter.lang('optionalCompatibilityExcluded', human));
        didIgnore = true;
      }
    } else {
      reporter.error(`${human}: ${msg}`);
      didError = true;
    }
  };

  const os = info.os,
        cpu = info.cpu,
        engines = info.engines;


  if (shouldCheckPlatform(os, config.ignorePlatform) && !isValidPlatform(os)) {
    pushError(reporter.lang('incompatibleOS', process.platform));
  }

  if (shouldCheckCpu(cpu, config.ignorePlatform) && !isValidArch(cpu)) {
    pushError(reporter.lang('incompatibleCPU', process.arch));
  }

  if (shouldCheckEngines(engines, ignoreEngines)) {
    for (var _iterator3 = (0, (_misc || _load_misc()).entries)(info.engines), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      const entry = _ref3;

      let name = entry[0];
      const range = entry[1];

      if (aliases[name]) {
        name = aliases[name];
      }

      if (VERSIONS[name]) {
        if (!testEngine(name, range, VERSIONS, config.looseSemver)) {
          pushError(reporter.lang('incompatibleEngine', name, range, VERSIONS[name]));
        }
      } else if (ignore.indexOf(name) < 0) {
        reporter.warn(`${human}: ${reporter.lang('invalidEngine', name)}`);
      }
    }
  }

  if (didError) {
    throw new (_errors || _load_errors()).MessageError(reporter.lang('foundIncompatible'));
  }
}