function validateDirectory(dirname, cb) {
  fs.readdir(dirname, function (err, files) {
    if (err) cb(err)
    var result = []
    var next = afterAll(function (err) {
      if (err) cb(err)
      if (result.length === 0) {
        console.log('everything seems nice')
      } else {
        console.log('While inspecting files: ' + files + ', we have found issues')
        console.log(result.join('\n'))
      }
    })
    files.filter(RegExp.prototype.test.bind(/\.html$/)).forEach(function (filename) {
      validateFile(result, filename, next())
    })
  })
}