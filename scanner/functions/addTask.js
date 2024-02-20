function addTask(cb, args) {
    tasks.push(function () {
      return cb.apply(null, args || [])
    })
  }