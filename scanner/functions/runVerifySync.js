function runVerifySync() {
  return new Promise((resolve) => {
    const suite = new Suite('Sync verify')

    return suite
      .add('@node-rs/jsonwebtoken', () => {
        verifySync(token, secretKey)
      })
      .add('node-jsonwebtoken', () => {
        nodeJwtVerifySync(token, secretKey)
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