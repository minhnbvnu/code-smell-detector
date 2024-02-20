function _es5WrapClass(shim, Base, fnName, spec, args) {
  /**
   * Wraps the es5 class in a function
   *
   * @returns {Function|undefined} a function if not already wrapped in WrappedClass
   */
  function WrappedClass() {
    const cnstrctArgs = argsToArray.apply(shim, arguments)
    if (!(this instanceof WrappedClass)) {
      // Some libraries support calling constructors without the `new` keyword.
      // In order to support this we must apply the super constructor if `this`
      // is not an instance of ourself. JavaScript really needs a better way
      // to generically apply constructors.
      cnstrctArgs.unshift(WrappedClass) // `unshift` === `push_front`
      return new (WrappedClass.bind.apply(WrappedClass, cnstrctArgs))()
    }

    // Assemble the arguments to hand to the spec.
    const _args = [shim, Base, fnName, cnstrctArgs]
    if (args.length > 0) {
      _args.push.apply(_args, args)
    }

    // Call the spec's before hook, then call the base constructor, then call
    // the spec's after hook.
    spec.pre && spec.pre.apply(null, _args)
    Base.apply(this, cnstrctArgs)
    spec.post && spec.post.apply(this, _args)
  }

  util.inherits(WrappedClass, Base)
  WrappedClass.prototype = Base.prototype

  return WrappedClass
}