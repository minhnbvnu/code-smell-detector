function wrapProtoRoute(shim, proto) {
  shim.wrap(proto, 'route', function wrapRoute(shim, original) {
    return function wrappedRoute() {
      const args = shim.argsToArray.apply(shim, arguments)

      if (!shim.isObject(args[0])) {
        return original.apply(this, args)
      }

      // If route is created via a plugin, pull prefix if it exists
      const prefix =
        (this.realm &&
          this.realm.modifiers &&
          this.realm.modifiers.route &&
          this.realm.modifiers.route.prefix) ||
        ''

      _wrapRoute(shim, args[0], prefix)

      return original.apply(this, args)
    }
  })
}