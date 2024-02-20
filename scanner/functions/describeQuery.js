function describeQuery(shim, queryFn, fnName, args) {
  shim.logger.trace('Recording query')
  const extractedArgs = extractQueryArgs(shim, args)

  // Pull out instance attributes.
  const parameters = getInstanceParameters(shim, this, extractedArgs.query)

  shim.logger.trace(
    {
      query: !!extractedArgs.query,
      callback: !!extractedArgs.callback,
      parameters: !!parameters
    },
    'Query segment descriptor'
  )

  return {
    stream: true,
    query: extractedArgs.query,
    callback: extractedArgs.callback,
    parameters: parameters,
    record: true
  }
}