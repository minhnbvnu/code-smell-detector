function runCommand(client, cmd) {
  return new Promise((resolve, reject) => {
    client.query(cmd, function (err) {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}