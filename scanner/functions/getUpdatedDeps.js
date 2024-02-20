function getUpdatedDeps (pkg, cb) {
  var opts = {
    stable: !argv.unstable,
    loose: true,
    error: {
      E404: argv.error404,
      ESCM: argv.errorSCM,
      EDEPTYPE: argv.errorDepType
    },
    ignore: argv.ignore || argv.i
  }

  if (argv.registry) {
    opts.npm = { registry: argv.registry }
  }

  david.getUpdatedDependencies(pkg, opts, function (err, deps) {
    if (err) return cb(err)

    david.getUpdatedDependencies(pkg, xtend(opts, { dev: true }), function (err, devDeps) {
      if (err) return cb(err)

      david.getUpdatedDependencies(pkg, xtend(opts, { optional: true }), function (err, optionalDeps) {
        cb(err, filterDeps(deps), filterDeps(devDeps), filterDeps(optionalDeps))
      })
    })
  })
}