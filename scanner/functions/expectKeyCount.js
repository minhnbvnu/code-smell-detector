function expectKeyCount (count) {
  return function (res) {
    assert.strictEqual(Object.keys(JSON.parse(res.text)).length, count)
  }
}