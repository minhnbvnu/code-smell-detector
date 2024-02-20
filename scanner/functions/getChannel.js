function getChannel(amqplib, cb) {
  if (cb) {
    amqplib.connect(CON_STRING, null, function (err, conn) {
      if (err) {
        return cb(err)
      }

      conn.createChannel(function (err, channel) {
        cb(err, {
          connection: conn,
          channel: channel
        })
      })
    })
  } else {
    return amqplib.connect(CON_STRING).then(function (conn) {
      return conn.createChannel().then(function (channel) {
        return { connection: conn, channel: channel }
      })
    })
  }
}