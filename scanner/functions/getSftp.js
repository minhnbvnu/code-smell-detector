function getSftp (callback) {
    if (sftpClient) return callback(null, sftpClient)
    ctx.connect().ready(function () {
      ssh.sftp(function (err, sftp) {
        if (err) return callback(err)
        sftpClient = sftp
        callback(null, sftp)
      })
    })
  }