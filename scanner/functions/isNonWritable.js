function isNonWritable({ obj, key, value }) {
  this.throws(function () {
    obj[key] = 'testNonWritable test value'
  }, new RegExp("(read only property '" + key + "'|Cannot set property " + key + ')'))

  if (value) {
    this.equal(obj[key], value)
  } else {
    this.not(obj[key], 'testNonWritable test value', 'should not set value when non-writable')
  }
}