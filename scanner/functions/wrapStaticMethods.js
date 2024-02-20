function wrapStaticMethods(lib, name, staticSpec) {
    _safeWrap(lib, name, staticSpec.cast, wrapCast)
  }