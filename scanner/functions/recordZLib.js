function recordZLib(shim, fn, name) {
    return { name: `zlib.${name}`, callback: shim.LAST, recorder }
  }