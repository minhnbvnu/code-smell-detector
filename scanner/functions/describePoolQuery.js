function describePoolQuery(shim, queryFn, fnName, args) {
  shim.logger.trace('Recording pool query')
  const extractedArgs = extractQueryArgs(shim, args)
  return {
    stream: true,
    query: null,
    callback: extractedArgs.callback,
    name: 'MySQL Pool#query',
    record: false
  }
}