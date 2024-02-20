function getDomainSocketPath(callback) {
  exec('mysql_config --socket', function (err, stdout, stderr) {
    if (err || stderr.toString()) {
      return callback(null)
    }

    const sock = stdout.toString().trim()
    fs.access(sock, function (err) {
      callback(err ? null : sock)
    })
  })
}