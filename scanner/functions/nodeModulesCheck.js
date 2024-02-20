function nodeModulesCheck({ /* context,*/ request }, cb) {
    if (path.isAbsolute(request)) return cb();
    if (request[0] === '.') return cb();
    const externalsExclude = context.config.build.externalsExclude;
    if (externalsExclude && externalsExclude[request]) {
      return cb();
    }
    return cb(null, `commonjs2 ${request}`);
  }