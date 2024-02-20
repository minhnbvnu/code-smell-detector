function internalMkDirs (sftp, filePath, callback) {
  var outPathDir = path.dirname(filePath).replace(/\\/g, '/')

  sftp.exists(outPathDir, function (result) {
    if (result) return callback()
    // recursively make parent directories as required
    internalMkDirs(sftp, outPathDir, function (err) {
      if (err) return callback(err)
      gutil.log('Creating directory \'' + gutil.colors.cyan(outPathDir) + '\'')
      sftp.mkdir(outPathDir, callback)
    })
  })
}