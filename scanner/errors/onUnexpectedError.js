function onUnexpectedError(err) {
      function indent(str) {
        return '\n  ' + str.trim().split('\n').join('\n  ');
      }

      const log = [];
      log.push(`Arguments: ${indent(process.argv.join(' '))}`);
      log.push(`PATH: ${indent(process.env.PATH || 'undefined')}`);
      log.push(`Yarn version: ${indent((_yarnVersion || _load_yarnVersion()).version)}`);
      log.push(`Node version: ${indent(process.versions.node)}`);
      log.push(`Platform: ${indent(process.platform + ' ' + process.arch)}`);

      log.push(`Trace: ${indent(err.stack)}`);

      // add manifests
      for (var _iterator3 = (_index2 || _load_index2()).registryNames, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref4 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref4 = _i3.value;
        }

        const registryName = _ref4;

        const possibleLoc = (_path || _load_path()).default.join(config.cwd, (_index2 || _load_index2()).registries[registryName].filename);
        const manifest = (_fs || _load_fs()).default.existsSync(possibleLoc) ? (_fs || _load_fs()).default.readFileSync(possibleLoc, 'utf8') : 'No manifest';
        log.push(`${registryName} manifest: ${indent(manifest)}`);
      }

      // lockfile
      const lockLoc = (_path || _load_path()).default.join(config.lockfileFolder || config.cwd, // lockfileFolder might not be set at this point
      (_constants || _load_constants()).LOCKFILE_FILENAME);
      const lockfile = (_fs || _load_fs()).default.existsSync(lockLoc) ? (_fs || _load_fs()).default.readFileSync(lockLoc, 'utf8') : 'No lockfile';
      log.push(`Lockfile: ${indent(lockfile)}`);

      const errorReportLoc = writeErrorReport(log);

      reporter.error(reporter.lang('unexpectedError', err.message));

      if (errorReportLoc) {
        reporter.info(reporter.lang('bugReport', errorReportLoc));
      }
    }