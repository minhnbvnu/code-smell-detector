function runTestFile(file, cb) {
  const testHelperDir = path.resolve(__dirname, '../helpers/')
  const proc = cp.fork(path.join(testHelperDir, file), { stdio: 'pipe' })
  let message = null

  let result = ''

  proc.stdout.on('data', function (data) {
    result += data
  })

  proc.on('message', function (msg) {
    message = msg
  })

  proc.on('exit', function () {
    if (message && message.error) {
      cb(message.error)
    } else if (result) {
      cb(null, result)
    } else {
      cb()
    }
  })
}