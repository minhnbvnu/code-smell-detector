function getQuery(shim, original, name, args) {
  const config = args[0]
  let statement
  if (config && (typeof config === 'string' || config instanceof String)) {
    statement = config
  } else if (config && config.text) {
    statement = config.text
  } else {
    // Won't be matched by parser, but should be handled properly
    statement = 'Other'
  }
  return statement
}