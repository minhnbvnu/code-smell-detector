function _fileExists (archivePath, opts) {
  let fs = opts.fs || _require('fs')
  return new Promise((resolve, reject) => {
    fs.stat(archivePath, (err, stats) => {
      if (err) reject(err)
      else resolve(stats && stats.isFile())
    })
  })
}