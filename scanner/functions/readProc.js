function readProc(path, callback) {
  fs.readFile(path, function readProcFile(err, data) {
    if (err) {
      logger.error(err, 'Error when trying to read %s', path)
      callback(err, null)
    } else {
      callback(null, data.toString())
    }
  })
}