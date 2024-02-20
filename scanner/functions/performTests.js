function performTests(name, resolve, reject) {
    doPerformTests(name, resolve, reject, true)
    doPerformTests(name, resolve, reject, false)
  }