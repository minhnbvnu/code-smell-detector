function wrapPreHandler(shim, container, path) {
  return shim.record(container, (shim) => {
    return { name: [shim.HAPI, ' pre handler: ', '(', path, ')'].join(''), recorder: record }
  })
}