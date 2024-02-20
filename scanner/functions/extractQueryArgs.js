function extractQueryArgs(shim, args) {
  let query = ''
  let callback = null

  // Figure out the query parameter.
  if (shim.isString(args[0])) {
    // query(sql [, values], callback)
    query = args[0]
  } else {
    // query(opts [, values], callback)
    query = args[0].sql
  }

  // Then determine the query values and callback parameters.
  if (shim.isArray(args[1])) {
    // query({opts|sql}, values, callback)
    callback = 2
  } else {
    // query({opts|sql}, callback)
    callback = 1
  }

  return {
    query: query,
    callback: callback
  }
}