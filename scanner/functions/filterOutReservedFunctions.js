function filterOutReservedFunctions (reserved, options) {
  // Filter out properties that are functions and are reserved.
  // Reserved values are passed in at call site.

  var object = {}
  for (var i in options) {
    var isReserved = !(reserved.indexOf(i) === -1)
    var isFunction = (typeof options[i] === 'function')
    if (!(isReserved && isFunction)) {
      object[i] = options[i]
    }
  }
  return object
}