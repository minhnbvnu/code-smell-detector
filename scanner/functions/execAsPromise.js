function execAsPromise(command) {
  return new Promise((resolve, reject) => {
    console.log(`Executing: '${command}'`)

    exec(command, (err, stdout) => {
      if (err) {
        return reject(err)
      }

      return resolve(stdout)
    })
  })
}