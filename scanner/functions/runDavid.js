function runDavid (args, fixture, cb) {
  rimraf(tmpPath, function (err) {
    if (err) return cb(err)

    fs.mkdir(tmpPath, function (err) {
      if (err) return cb(err)

      fs.mkdir(path.join(tmpPath, fixture), function (err) {
        if (err) return cb(err)

        var fixturePkgPath = path.join(fixturesPath, fixture, 'package.json')
        var tmpPkgPath = path.join(tmpPath, fixture, 'package.json')

        cp(fixturePkgPath, tmpPkgPath, function () {
          args = [davidPath].concat(args)
          var opts = { cwd: path.join(tmpPath, fixture) }
          var proc = childProcess.execFile('node', args, opts, cb)

          proc.stdout.pipe(process.stdout)
          proc.stderr.pipe(process.stderr)
        })
      })
    })
  })
}