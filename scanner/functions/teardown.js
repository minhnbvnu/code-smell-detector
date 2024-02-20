function teardown () {
  _(['bat', 'ball']).each(function (f) {
    try {
      fs.unlinkSync(path.resolve('test/fixtures/baseball', f))
    } catch (e) {}
  })
}