function runVerifyAsync() {
  return new Promise((resolve) => {
    const suite = new Suite('Async verify')

    return suite
      .add('@node-rs/jsonwebtoken', {
        defer: true,
        fn: (deferred) => {
          const asyncJobs = range(numOfCores).map(() => verify(token, secretKey))
          Promise.all(asyncJobs).then(() => deferred.resolve())
        },
      })
      .add('node-jsonwebtoken', {
        defer: true,
        fn: (deferred) => {
          const asyncJobs = range(numOfCores).map(() => nodeJwtVerifyAsync(token, secretKey))
          Promise.all(asyncJobs).then(() => deferred.resolve())
        },
      })
      .on('cycle', function (event) {
        console.info(String(event.target))
      })
      .on('complete', function () {
        console.info(`${this.name} bench suite: Fastest is ${chalk.green(this.filter('fastest').map('name'))}`)
        resolve()
      })
      .run()
  })
}