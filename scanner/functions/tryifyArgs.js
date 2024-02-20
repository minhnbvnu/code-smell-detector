function tryifyArgs (func) {
  return function () {
    var args = arrayFrom(arguments).map(function (arg) {
      return wrap(arg)
    })

    return func.apply(this, args)
  }
}