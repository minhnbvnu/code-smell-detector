function verifyBinary(binary, prependFlag) {
    if (binary && !usablePythonWasFound) {
      // clear re-used "result" variables now that we're checking another python binary.
      stdout = '';
      fullVersion = '';

      let allFlags = [
        '-c',
        'import platform\nprint(platform.python_version())'
      ];
      if (prependFlag) {
        // prependFlag is an optional argument,
        // used to prepend "-2" for the "py.exe" launcher.
        //
        // TODO: Refactor this script by eliminating "prependFlag"
        // once we update to node-gyp v7.x or newer;
        // the "-2" flag is not used in node-gyp v7.x.
        allFlags.unshift(prependFlag);
      }

      try {
        stdout = childProcess.execFileSync(binary, allFlags, {
          env: process.env,
          stdio: ['ignore', 'pipe', 'ignore']
        });
      } catch (e) {}

      if (stdout) {
        if (stdout.indexOf('+') !== -1)
          stdout = stdout.toString().replace(/\+/g, '');
        if (stdout.indexOf('rc') !== -1)
          stdout = stdout.toString().replace(/rc(.*)$/gi, '');
        fullVersion = stdout.toString().trim();
      }

      if (fullVersion) {
        let versionComponents = fullVersion.split('.');
        let majorVersion = Number(versionComponents[0]);
        let minorVersion = Number(versionComponents[1]);
        if (
          (majorVersion === 2 && minorVersion >= 6) ||
          (majorVersion === 3 && minorVersion >= 5)
        ) {
          usablePythonWasFound = true;
        }
      }

      // Prepare to log which commands were tried, and the results, in case no usable Python can be found.
      if (prependFlag) {
        binaryPlusFlag = binary + ' ' + prependFlag;
      } else {
        binaryPlusFlag = binary;
      }
      triedLog = triedLog.concat(
        `log message: tried to check version of "${binaryPlusFlag}", got: "${fullVersion}"\n`
      );
    }
  }