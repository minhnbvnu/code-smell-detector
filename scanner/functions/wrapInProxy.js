function wrapInProxy({ fn, fnName, shim, args, spec }) {
  let unwrapReference = null

  const handler = {
    get: function getTrap(target, prop) {
      // The wrapped symbol only lives on proxy
      // not the proxied item.
      if (prop === symbols.wrapped) {
        return this[prop]
      }
      // Allow for look up of the target
      if (prop === symbols.original) {
        return target
      }
      if (prop === symbols.unwrap) {
        return unwrapReference
      }

      return target[prop]
    },
    defineProperty: function definePropertyTrap(target, key, descriptor) {
      if (key === symbols.unwrap) {
        unwrapReference = descriptor.value
      } else {
        Object.defineProperty(target, key, descriptor)
      }
      return true
    },
    set: function setTrap(target, key, val) {
      // If we are setting the wrapped symbol on proxy
      // we do not actually want to assign to proxied
      // item but the proxy itself.
      if (key === symbols.wrapped) {
        this[key] = val
      } else if (key === symbols.unwrap) {
        unwrapReference = val
      } else {
        target[key] = val
      }
      return true
    },
    construct: function constructTrap(target, proxyArgs, newTarget) {
      // Call the underlying function via Reflect.
      let ret = Reflect.construct(target, proxyArgs, newTarget)

      // Assemble the arguments to hand to the spec.
      const _args = [shim, fn, fnName, ret]
      if (args.length > 0) {
        _args.push.apply(_args, args)
      }

      // Call the spec and see if it handed back a different return value.
      const newRet = spec.apply(ret, _args)
      if (newRet) {
        ret = newRet
      }

      return ret
    },
    apply: function applyTrap(target, thisArg, proxyArgs) {
      // Call the underlying function. If this was called as a constructor, call
      // the wrapped function as a constructor too.
      let ret = target.apply(thisArg, proxyArgs)

      // Assemble the arguments to hand to the spec.
      const _args = [shim, fn, fnName, ret]
      if (args.length > 0) {
        _args.push.apply(_args, args)
      }

      // Call the spec and see if it handed back a different return value.
      const newRet = spec.apply(thisArg, _args)
      if (newRet) {
        ret = newRet
      }

      return ret
    }
  }

  return new Proxy(fn, handler)
}