function wrapPrototype(PromiseProto) {
    const name = spec.constructor + '.prototype'

    // Wrap up instance methods.
    _safeWrap(PromiseProto, name, spec.$proto.then, wrapThen)
    _safeWrap(PromiseProto, name, spec.$proto.catch, wrapCatch)
  }