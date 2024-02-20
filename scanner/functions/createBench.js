function createBench(suitename, transform, napi, jieba, input) {
  const cutSuite = new Suite(suitename)
  console.assert(transform(napi(input)) === transform(jieba(input)))

  cutSuite
    .add('@node-rs/jieba', () => {
      napi(input)
    })
    .add('nodejieba', () => {
      jieba(input)
    })
    .on('cycle', function (event) {
      console.info(String(event.target))
    })
    .on('complete', function () {
      console.info(`${this.name} bench suite: Fastest is ${chalk.green(this.filter('fastest').map('name'))}`)
    })
    .run()
}