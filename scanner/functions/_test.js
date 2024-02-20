function _test(t, name, i) {
    const val = values[i]
    t.comment(typeof val === 'function' ? val.toString() : JSON.stringify(val))
    return testFunc(t, name, val).then(function () {
      if (++i < values.length) {
        return _test(t, name, i)
      }
    })
  }