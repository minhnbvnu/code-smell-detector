function writeErrorReport(log) {
      const errorReportLoc = config.enableMetaFolder ? (_path || _load_path()).default.join(config.cwd, (_constants || _load_constants()).META_FOLDER, 'yarn-error.log') : (_path || _load_path()).default.join(config.cwd, 'yarn-error.log');

      try {
        (_fs || _load_fs()).default.writeFileSync(errorReportLoc, log.join('\n\n') + '\n');
      } catch (err) {
        reporter.error(reporter.lang('fileWriteError', errorReportLoc, err.message));
        return undefined;
      }

      return errorReportLoc;
    }