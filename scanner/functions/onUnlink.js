function onUnlink(unlinkErr) {
    if (isFatalUnlinkError(unlinkErr)) {
      return callback(unlinkErr);
    }
    fs.symlink(srcPath, destPath, opts.type, onSymlink);
  }