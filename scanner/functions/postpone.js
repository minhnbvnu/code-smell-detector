function postpone (f) {
  return function (options) {
    timers.setTimeout(f.bind(null, options))
  }
}