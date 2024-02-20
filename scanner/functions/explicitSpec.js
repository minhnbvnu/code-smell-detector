function explicitSpec() {
  return {
    req: shim.FIRST,
    res: shim.SECOND,
    next: shim.LAST,
    name: 'funcy_name',
    params: function (shim, fn, name, args) {
      return args[0].params
    }
  }
}