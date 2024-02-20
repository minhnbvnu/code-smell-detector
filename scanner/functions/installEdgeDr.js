function installEdgeDr(opts) {
    if (path.extname(opts.from) === '.msi') {
      return downloadInstallerFile(opts.from, opts.to);
    }
    return installSingleFile(opts.from, opts.to);
  }