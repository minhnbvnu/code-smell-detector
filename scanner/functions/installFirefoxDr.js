function installFirefoxDr(opts) {
    // only windows build is a zip
    if (path.extname(opts.from) === '.zip') {
      return installZippedFile(opts.from, opts.to);
    }
    return installGzippedFile(opts.from, opts.to);
  }