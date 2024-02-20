function resolveNodule({ nodule, instrumentation, esmResolver }) {
  if (instrumentation.isEsm === true || !esmResolver) {
    return nodule
  }

  // We have a CJS module wrapped by import-in-the-middle having been
  // imported through ESM syntax. Due to the way CJS modules are parsed by
  // ESM's import, we can have the same "export" attached to the `default`
  // export and as a top-level named export. In order to shim things such
  // that our users don't need to know to access `something.default.foo`
  // when they have done `import * as something from 'something'`, we need
  // to proxy the proxy in order to set our wrappers on both instances.
  const noduleDefault = nodule.default
  const origNodule = nodule
  return new Proxy(
    { origNodule, noduleDefault },
    {
      get(target, name) {
        if (name === nrEsmProxy) {
          return true
        }
        if (target.noduleDefault[name]) {
          return target.noduleDefault[name]
        }
        return target.origNodule[name]
      },
      set(target, name, value) {
        if (target.origNodule[name]) {
          target.origNodule[name] = value
        }
        if (target.noduleDefault[name]) {
          target.noduleDefault[name] = value
        }
        return true
      }
    }
  )
}