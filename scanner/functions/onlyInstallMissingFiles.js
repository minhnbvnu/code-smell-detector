async function onlyInstallMissingFiles(opts) {
    let file;
    try {
      file = await readFile(opts.to);
    } catch (err) {
      // ENOENT means not found which is ok. But anything else re-raise
      if (err.code != 'ENOENT') {
        throw err;
      }
    }
    const isLatest = await isUpToDate(opts.from, file, opts.to);

    // File already exists. Prevent download/installation.
    if (isLatest) {
      logger('---');
      logger('File from ' + opts.from + ' has already been downloaded');
      return;
    }

    return opts.installer({
      to: opts.to,
      from: opts.from,
    });
  }