function updateNative(pg, instrumentPGNative) {
  if (pg[nrEsmProxy] === true) {
    // When pg is imported via an ESM import statement, then our proxy will
    // make our non-ESM native getter wrapper not work correctly. Basically,
    // the getter will get evaluated by the proxy, and we never gain access to
    // replace the getter with our own implementation. Luckily, we get to
    // simplify in this scenario.
    const native = pg.default.native
    if (native !== null) {
      instrumentPGNative(native)
    }
  } else {
    // The pg module defines a "native" getter which sets up the native client lazily
    // (only when called).  We replace the getter, so that we can instrument the native
    // client.  The original getter replaces itself with the instance of the native
    // client, so only instrument if the getter exists (otherwise assume already
    // instrumented).
    const origGetter = pg.__lookupGetter__('native')
    if (origGetter) {
      delete pg.native
      pg.__defineGetter__('native', function getNative() {
        const temp = origGetter()
        if (temp != null) {
          instrumentPGNative(temp)
        }
        return temp
      })
    }
  }
}