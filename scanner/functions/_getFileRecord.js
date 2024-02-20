async function _getFileRecord (fileEntry, opts) {
  let fs = opts.fs || _require('fs')
  // for text files load content
  // for binaries use a url
  let record = {
    path: fileEntry.name,
    encoding: null,
    size: fileEntry.size,
    createdAt: fileEntry.birthtime.getTime(),
    updatedAt: fileEntry.mtime.getTime()
  }
  if (_isTextFile(fileEntry.name)) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileEntry.path, 'utf8', (err, content) => {
        if (err) return reject(err)
        record.encoding = 'utf8'
        record.data = content
        resolve(record)
      })
    })
  } else {
    // used internally only
    record._binary = true
    if (opts.noBinaryContent) {
      return Promise.resolve(record)
    } else {
      return new Promise((resolve, reject) => {
        fs.readFile(fileEntry.path, 'hex', (err, content) => {
          if (err) return reject(err)
          record.encoding = 'hex'
          record.data = content
          resolve(record)
        })
      })
    }
  }
}