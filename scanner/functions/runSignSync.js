function runSignSync() {
  return new Promise((resolve) => {
    const suite = new Suite('Sync sign')

    return suite
      .add('@node-rs/jsonwebtoken', () => {
        signSync(jwtClaims, secretKey)
      })
      .add('node-jsonwebtoken', () => {
        nodeJwtSignSync(jwtClaims, secretKey)
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