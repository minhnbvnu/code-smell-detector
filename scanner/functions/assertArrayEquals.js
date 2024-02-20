function assertArrayEquals(first, second) {
  var message = first + ' != ' + second

  first.forEach(function(item, i) {
    assert.equal(item, second[i], message)
  })
}