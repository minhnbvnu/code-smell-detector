function mkdirfix (name, opts, cb) {
  mkdirp(name, {fs: opts.fs}, function (err, made) {
    if (!err && made && opts.own) {
      chownr(made, opts.uid, opts.gid, cb)
    } else {
      cb(err)
    }
  })
}