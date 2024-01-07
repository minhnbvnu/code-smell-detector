function shouldHaveHeaderValues (key, values) {
  return function (res) {
    var headers = res.headers[key.toLowerCase()]
    assert.ok(headers, 'should have header "' + key + '"')
    assert.strictEqual(headers.length, values.length, 'should have ' + values.length + ' occurances of "' + key + '"')
    for (var i = 0; i < values.length; i++) {
      assert.strictEqual(headers[i], values[i])
    }
  }
}