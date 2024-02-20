function throwPermError(err, dest) {
      if (err.code === 'EACCES') {
        throw new (_errors || _load_errors()).MessageError(reporter.lang('noPermission', dest));
      } else {
        throw err;
      }
    }