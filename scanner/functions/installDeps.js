function installDeps (deps, opts, cb) {
  opts = opts || {}

  var depNames = Object.keys(deps)

  // Nothing to install!
  if (!depNames.length) {
    return cb(null)
  }

  depNames = depNames.filter(function (depName) {
    return !deps[depName].warn
  })

  var npmOpts = { global: opts.global }

  // Avoid warning message from npm for invalid registry url
  if (opts.registry) {
    npmOpts.registry = opts.registry
  }

  npm.load(npmOpts, function (err) {
    if (err) return cb(err)

    if (opts.save) {
      npm.config.set('save' + (opts.dev ? '-dev' : opts.optional ? '-optional' : ''), true)
    }

    var installArgs = [depNames.map(function (depName) {
      return depName + '@' + deps[depName][argv.unstable ? 'latest' : 'stable']
    }), function (err) {
      npm.config.set('save' + (opts.dev ? '-dev' : opts.optional ? '-optional' : ''), false)
      cb(err)
    }]

    if (opts.path) { installArgs.unshift(opts.path) }

    npm.commands.install.apply(npm.commands, installArgs)
  })
}