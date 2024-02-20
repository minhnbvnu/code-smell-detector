function onRequireHandler(shim, localPkg, name) {
    t.equal(
      shim.pkgVersion,
      process.version,
      'defaults to node version for pkgVersion as this is not a package'
    )
    t.ok(shim.id)
    t.equal(name, LOCAL_MODULE)
    const result = localPkg()
    t.same(result, { hello: 'world' })
    t.end()
  }