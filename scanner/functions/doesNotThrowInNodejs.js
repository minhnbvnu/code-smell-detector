function doesNotThrowInNodejs (t, fn, descr) {
  if (platform.inNodeJS) {
    t.doesNotThrow(fn, descr)
  } else {
    let success = false
    try {
      fn()
      success = true
    } finally {
      t.ok(success, descr)
    }
  }
}