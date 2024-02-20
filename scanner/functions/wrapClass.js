function wrapClass(nodule, properties, spec, args) {
  // Munge our parameters as needed.
  if (this.isObject(properties) && !this.isArray(properties)) {
    // wrapReturn(nodule, spec [, args])
    args = spec
    spec = properties
    properties = null
  }
  if (this.isFunction(spec)) {
    spec = new specs.ClassWrapSpec({ pre: null, post: spec })
  } else {
    spec.pre = spec.pre || null
    spec.post = spec.post || null
  }
  if (!this.isArray(args)) {
    args = []
  }

  // Perform the wrapping!
  return this.wrap(nodule, properties, function classWrapper(shim, Base, fnName) {
    // Only functions can have return values for us to wrap.
    if (!shim.isFunction(Base) || shim.isWrapped(Base)) {
      return Base
    }

    // When es6 classes are being wrapped, we need to use an es6 class due to
    // the fact our es5 wrapper depends on calling the constructor without `new`.
    const wrapper = spec.es6 || /^class /.test(Base.toString()) ? _es6WrapClass : _es5WrapClass

    return wrapper(shim, Base, fnName, spec, args)
  })
}