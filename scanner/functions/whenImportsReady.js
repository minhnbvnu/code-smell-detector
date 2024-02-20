function whenImportsReady(cb) {
    if (window.HTMLImports) {
      HTMLImports.whenReady(cb);
    } else {
      cb();
    }
  }