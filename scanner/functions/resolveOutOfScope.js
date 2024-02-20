function resolveOutOfScope(val) {
    return new Promise(function (resolve) {
      tasks.push(function () {
        resolve(val)
      })
    })
  }