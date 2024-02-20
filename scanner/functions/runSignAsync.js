function runSignAsync() {
  return new Promise((resolve) => {
    const suite = new Suite('Async sign')

    return suite
      .add('@node-rs/jsonwebtoken', {
        defer: true,
        fn: (deferred) => {
          const asyncJobs = range(numOfCores).map(() => sign(jwtClaims, secretKey))
          Promise.all(asyncJobs).then(() => deferred.resolve())
        },
      })
      .add('node-jsonwebtoken', {
        defer: true,
        fn: (deferred) => {
          const asyncJobs = range(numOfCores).map(() => nodeJwtSignAsync(jwtClaims, secretKey))
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